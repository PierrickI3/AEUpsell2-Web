# ECCC Genesys Cloud Adoption Metrics

This tool is designed to visualize which features a Genesys Cloud customer is using (or not) using the Genesys Cloud Public API. The layout is copied from the [Genesys Cloud Pricing Guide](https://www.genesys.com/pricing) page and shows if a customer uses a specific feature or not along with their licensing level. 

It includes 2 views:

* The [Genesys Cloud Adoption Metrics - Summary](https://pierricki3.github.io/AEUpsell2-Web/index.html) view
* The [Genesys Cloud Adoption Metrics - Detailled](https://pierricki3.github.io/AEUpsell2-Web/index2.html) view

## Summary view

The [Genesys Cloud Adoption Metrics - Summary](https://pierricki3.github.io/AEUpsell2-Web/index.html) view shows the following data:

* Historical data
  * Number of conversations, conferences, chats, emails, callbacks, co-browse sessions, internal video sessions, screen shares and messages that took place during a specific date/time range.
  * Number of `recorded` calls, chants, emails and messages.
  * Licensing usage
* Current Configuration
  * Contact Center: number of users, queues, evaluation forms, response libraries, skills, wrap up codes, scripts, dialer campaigns & dialer contact lists configured
  * Workforce Management: number of WFM Management units & Scheduling runs configured
  * Documents: number of documents stored
  * External Contacts: number of external contacts configured
  * GDPR Requests: number of current GDPR requests being processed
  * Flows: number of IVR flows configured
  * Divisions: number of divisions
  * Telephony: number of stations, edges, trunks and SMS phone numbers configured
  * Integrations: list of configured integrations
  * Organization Features: list of enabled/disabled Genesys Cloud features for this org
  * Stations: list and number of station types configured
  * Routing Languages: list of routing languages configured in the org
  * Identity Providers: list of SSO providers used in the org
  * Locations: On a map, all the different locations that are currently configured

## Requirements

Depending on how you want to login via this application you'll need to create either `Client Credentials` or `Implicit Grant (Browser)` OAuth Client:

You will need the following to use this tool:

* A `Client Credentials` OAuth id & secret: 
  * Go to Admin/OAuth (under the `Integrations` section)
  * Click on the `Add Client` button
  * Give it a name (e.g. `Genesys Adoption Metrics`) and a description (optional)
  * Under `Grant types`, select the `Client Credentials` option
  * Switch to the `Roles` tab
  * Assign the `Master Admin` role or select your own role (check the [Roles](#roles) section for details)
  * Select all divisions
  * Click on the `Save` button
  * Copy the `Client ID` and `Client Secret` values somewhere safe. **DO NOT SHARE THESE WITH ANYONE OUTSIDE OF YOUR ORGANIZATION OR OF GENESYS**

* In Case you want to use `Implicit Grant (Browser)` you need to specify appropiate Scope that application will be able to use.
  *  alerting:readonly
  *  analytics:readonly
  *  architect:readonly
  *  audits:readonly
  *  authorization:readonly
  *  billing:readonly
  *  content-management:readonly
  *  conversations:readonly
  *  devices:readonly
  *  dialog:readonly
  *  external-contacts:readonly
  *  fax:readonly
  *  gdpr:readonly
  *  geolocation:readonly
  *  greetings:readonly
  *  locations:readonly
  *  messaging:readonly
  *  oauth:readonly
  *  organization-authorization:readonly
  *  organization:readonly
  *  outbound:readonly
  *  presence:readonly
  *  quality:readonly
  *  recordings:readonly
  *  response-management:readonly
  *  routing:readonly
  *  scim:readonly
  *  scripts:readonly
  *  search:readonly
  *  speech-and-text-analytics:readonly
  *  stations-authorization:readonly
  *  streaming-events:readonly
  *  telephony:readonly
  *  user-recordings:readonly
  *  user:readonly
  *  voicemail:readonly
  *  web-chat:readonly
  *  workforce-management:readonly

* Know your Genesys Cloud environment. Available environments:
  * mypurecloud.com - North America (East)
  * mypurecloud.com.au - Australia/New Zealand
  * mypurecloud.de - Frankfurt
  * mypurecloud.ie - EU (Ireland)
  * mypurecloud.jp - Japan
  * usw2.pure.cloud - North America (West)

The following features should be enabled:

    * Audit API
    * Billing API

These features might not be enabled in your org if it was created a long time ago.

## Roles

 This tool requires only **read** access to all APIs to gather the data. Usually, “Master Admin” is enough but you can also create a “Master Admin – Readonly” role if you want to make sure the tool will not modify anything. If the role assigned to the OAuth entry does not have all read permissions, you will see errors while running this tool. Make sure you also set the permissions for all your divisions.

* Go to Admin and click on `Roles/Permissions` under the `People & Permissions` section
* Click on the `Add Role` button
* Name it `Master Admin - Readonly` (or any name that pleases you)
* Switch to the `Permissions` tab
* Set the number of records per page to 200 (dropdown below the list)
* Select the following permissions:
  * acdscreenshare>All Permissions (there is no `View` permission available)
  * acdvideo>All Permissions  (there is no `View` permission available)
  * alerting>alert>view
  * alerting>rule>view
  * analytics>All Permissions (there is no `View` permission available since Analytics can't change data anyway)
  * Architect>datatable>view
  * Architect>dependencyTracking>view
  * Architect>flow>View
  * Architect>flowOutcome>View
  * Architect>systemPrompt>View
  * Architect>userPrompt>View
  * attributes>attribute>View
  * audits>audit>View
  * authorization>audit>view
  * authorization>division>View
  * authorization>role>View
  * Billing>Subscription>View
  * cobrowse>session>View
  * Conversation>Call>View
  * Conversation>callback>View
  * Conversation>email>View
  * Conversation>message>View
  * Conversation>webchat>View
  * dialog>bot>View
  * dialog>botDomain>View
  * dialog>botDomainModel>View
  * dialog>botUtterance>View
  * dialog>botVersion>View
  * dialog>dialogBotSession>View
  * dialog>dialogOutcome>View
  * dialog>dialogSession>View
  * dialog>utterance>View
  * Documents>Audit>View
  * externalContacts>contact>View
  * gdpr>request>View
  * General>Location Contributor (this application will not change anything, just read Locations)
  * integrations>action>View
  * integrations>integration>View
  * journey>actionmap>View
  * journey>actiontarget>View
  * journey>actiontemplate>View
  * journey>customer>View
  * journey>event>View
  * journey>eventtype>View
  * journey>outcome>View
  * journey>outcomescores>View
  * journey>segment>View
  * journey>session>View
  * journey>sessiontype>View
  * journey>settings>View
  * journey>visit>View
  * messaging>integration>View
  * Outbound>attemptLimits>View
  * Outbound>Audit>View
  * Outbound>Callable Time Set>View
  * Outbound>Campaign Sequence>View
  * Outbound>Campaign>View
  * Outbound>campaignRule>View
  * Outbound>Contact List>View
  * Outbound>Contact>View
  * Outbound>contactListFilter>View
  * Outbound>DNC List>View
  * Outbound>Response Set>View
  * Outbound>Rule Set>View
  * Outbound>Schedule>View
  * Outbound>settings>View
  * presence>presenceDefinition>Edit (there is no `View` permission available)
  * purecloudvoice>number>View
  * Quality>Calibration>View
  * Quality>Calibration>View Audit
  * Quality>Evaluation Form>View
  * Quality>Evaluation>View (no specific conditions required)
  * Quality>Evaluation>View Audit (no specific conditions required)
  * Quality>keywordset>View
  * Quality>survey>View
  * Quality>survey>View Audit
  * Quality>surveyForm>View
  * Recording>Annotation>View (no specific conditions required)
  * Recording>Annotation>View Audit (no specific conditions required)
  * Recording>Orphan Recording>View
  * Recording>Recording>View (no specific conditions required)
  * Recording>Recording>View Audit (no specific conditions required)
  * Recording>Retention Policy>View
  * Recording>screenRecording>View
  * Recording>screenRecording>View Audit
  * Responses>Library>View
  * Responses>Response>View
  * Routing>language>All Permissions (there is no `View` permission available)
  * Routing>Queue>View
  * Routing>utilization>View
  * Routing>Wrap-up Code>View
  * Scripter>Published Script>View
  * Scripter>Script>View
  * Single Sign-on>Provider>View
  * sms>phoneNumber>View
  * Telephony>phone>All permissions (there is no `View` permission available)
  * Telephony>sites>View
  * webchat>deployment>Read
  * Widgets>Widget Deployments>View
  * Workforce Management>Activity Code>View
  * Workforce Management>Adhoc ACD Modeling>View
  * Workforce Management>Adhoc Forecast>View
  * Workforce Management>Agent Schedule Notification>View
  * Workforce Management>Agent Schedule>View
  * Workforce Management>Agent>View
  * Workforce Management>Historical Adherence>View
  * Workforce Management>Management Unit>View
  * Workforce Management>Predictions AI-Driven Schedule Request>View
  * Workforce Management>Published Schedule>View
  * Workforce Management>Real-Time Adherence>View
  * Workforce Management>Schedule>View
  * Workforce Management>Service Goal Group>View
  * Workforce Management>Shift Trade Request>View
  * Workforce Management>Short-Team Forecast>View
  * Workforce Management>Time Off Request>View
  * Workforce Management>Work Plan>View
* Click on the `Save` button and click on the `Roles/Permissions` item on the left-side menu to go back to the list of Roles.
* You will need to be a member of this role to be able to assign it to the OAuth entry
  * Click on the three dots at the end of the row for the role you have just created and click on `Change Membership`
  * Search for your user and select it
  * Enable the `Set divisions for 1 assigned people` option and select all divisions (or enable the `All future divisions` option directly)
  * Click on `Save`
* Go back to the [Requirements](#requirements) section to continue

To use `Implicit Grant (Browser)` lunch application with following 2 parameters
?environment=[Genesys Cloud environment]&clientId=[defined in previous step OAUth ClientId]

## Troubleshooting

* I can see a red message when running: TODO Check permissions (does Master Admin really have all permissions?)

## Security Concerns

This code is released in open source to show you that we didn't hide anything. The lambda functions being used only **read** the information from the target organization and nothing else. No data is sent to Genesys.

## Bugs and Issues

Have a bug or an issue with this application? [Open a new issue](https://github.com/PierrickI3/AEUpsell2-Web/issues) here on GitHub.

## About

This tool has been created by the Genesys EMEA Cloud Competence Center group. All of the code is released under the MIT license, which means you can use them for any purpose, even for commercial projects.

The web page is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2019-2020 Genesys. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-resume/blob/gh-pages/LICENSE) license.
