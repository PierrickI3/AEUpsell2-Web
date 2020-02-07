
// Search Flow for used Tool Types that match query
function findFlowTools(_flows, _query, _flowType) {
  try {
    var iCount = 0;
    var matchFlows = [];
    for (var aItem in _flows) {
      if (_flowType != undefined && _flows[aItem].type != _flowType) continue
      iCount = 0;
      flowTaskType = findValues(_flows[aItem], '__type');
      _query.forEach(function (item) {
        if (flowTaskType.includes(item)) iCount++;
      });
      if (_query.length == iCount) {
        matchFlows.push({
          id: _flows[aItem].id,
          index: aItem
        });
      }
    }
  } catch (error) {
    console.log(error);
    return matchFlows
  }
  return matchFlows
}

function findInUsedFlows(_flows, _historyFlow) {
  for (var x = 0; x < _flows.length; x++) {
    if (_historyFlow.includes(_flows[x].id)) {
      return true
    }
  }
  return false
}

function findValues(obj, key) {
  return findValuesHelper(obj, key, []);
}

function findValuesHelper(obj, key, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
      list = list.concat(findValuesHelper(obj[i], key, []));
    }
    return list;
  }
  if (obj[key]) list.push(obj[key]);

  if ((typeof obj == "object") && (obj !== null)) {
    var children = Object.keys(obj);
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        list = list.concat(findValuesHelper(obj[children[i]], key, []));
      }
    }
  }
  return list;
}

function getToolsDetailsFromFlow(_flow, _type) {
  retValues = [];

  if (usages.flows[_flow.index].flowSequenceItemList) {
    usages.flows[_flow.index].flowSequenceItemList.forEach(function (aSequenceItem) {
      if (aSequenceItem.actionList) {
        aSequenceItem.actionList.forEach(function (aAction) {

          switch (aAction['__type']) {
            case 'DataAction':
              if (aAction['__type'] != _type) break;
              if (aAction.inputs) {
                aAction.inputs.forEach(function (item) {
                  retValues.push(item.value.text);
                });
              }
              break;
            case 'TransferPureMatchAction':
              if (aAction['__type'] != _type) break;
              if (aAction.queues) {
                aAction.queues.forEach(function (item) {
                  retValues.push(item.text);
                });
              }
              break;

            default:
              break;
          }

        })
      }
    })
  }

  return retValues
}

function analyzeUseCases(_usages) {
  console.log('function analyzeUseCases');
  useCases = {
    ce01: {
      configured: false,
      used: undefined
    },
    ce03: {
      configured: false,
      used: undefined
    },
    ce04: {
      configured: false,
      used: undefined
    },
    ce07: {
      configured: false,
      used: undefined
    }
  }



  if (_usages.flows != undefined && _usages.flows.length == 0)
    return useCases

  var query, flowConfigurationFound, flowConfigurationFound2;


  //#region CE01 /Genesys Call Routing
  query = ['PlayAudioAction', 'Menu', 'TransferPureMatchAction', 'EvaluateScheduleAction']; // check if TransferPureMatchAction transfer to Queue
  flowConfigurationFound = findFlowTools(_usages.flows, query);
  flowConfigurationFound2 = [];

  flowConfigurationFound.forEach(function (aItem) {
    iCount = 0;
    // Check if defined in Flow QueueName exists in GenesysCloud definition:
    let usedQueues = getToolsDetailsFromFlow(aItem, 'TransferPureMatchAction');

    for (x = 0; x < usages.queues.length; x++) {
      if (usedQueues.includes(usages.queues[x].name)) {
        iCount++;
      }
      if (iCount == usedQueues.length) break;
    }

    if (iCount == usedQueues.length) {
      flowConfigurationFound2.push(aItem)
    }

  })

  if (flowConfigurationFound2.length > 0) useCases.ce01.configured = true;
  if (findInUsedFlows(flowConfigurationFound2, _usages.history.usedFlowIds))
    useCases.ce01.used = true
  else
    useCases.ce01.used = false

  //#endregion

  //#region CE03 /Genesys Callback
  query = ['TransferPureMatchAction', 'DecisionAction', 'CreateCallbackAction', 'PlayEstimatedWaitTimeAction', 'PlayAudioAction'];
  flowConfigurationFound = findFlowTools(_usages.flows, query, 'inqueuecall');
  flowConfigurationFound2 = [];

  flowConfigurationFound.forEach(function (aItem) {
    iCount = 0;
    // Check if defined in Flow QueueName exists in GenesysCloud definition:
    let usedQueues = getToolsDetailsFromFlow(aItem, 'TransferPureMatchAction');

    for (x = 0; x < usages.queues.length; x++) {
      if (usedQueues.includes(usages.queues[x].name)) {
        iCount++;
      }
      if (iCount == usedQueues.length) break;
    }

    if (iCount == usedQueues.length) {
      flowConfigurationFound2.push(aItem)
    }

  })

  if (flowConfigurationFound.length > 0) useCases.ce03.configured = true
  if (findInUsedFlows(flowConfigurationFound, _usages.history.usedFlowIds))
    useCases.ce03.used = true
  else
    useCases.ce03.used = false;

  //#endregion

  //#region CE04 /Genesys Skype for Business 
  if (_usages.integrations['skype-for-business-client'] != undefined) useCases.ce04.configured = true

  //#endregion 

  //#region CE07 /Genesys Customer Authentication 
  query = ['TransferPureMatchAction', 'DecisionAction', 'DataAction'];
  flowConfigurationFound = findFlowTools(_usages.flows, query);
  flowConfigurationFound2 = [];

  flowConfigurationFound.forEach(function (aItem) {
    if (getToolsDetailsFromFlow(aItem, 'DataAction').includes('Call.Ani')) {
      flowConfigurationFound2.push(aItem);
    }
  })

  if (flowConfigurationFound2.length > 0) useCases.ce07.configured = true
  if (findInUsedFlows(flowConfigurationFound2, _usages.history.usedFlowIds))
    useCases.ce07.used = true
  else
    useCases.ce07.used = false;

  //#endregion 









  return useCases

}

