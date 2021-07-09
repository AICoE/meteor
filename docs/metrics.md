# Metric Collection

The purpose of this markdown is to collect and aggregate the different metrics we would like to measure for analyzing different aspects of the [Elyra tutorial](https://github.com/AICoE/elyra-aidevsecops-tutorial).

These metrics should help us answer some of the questions like how many users are interacting with the tutorial, what is the performance of our build pipelines etc. We would like to come up with metrics both on a **high** and **low** level. The **_high level_** metrics would be more broadly scoped and concerned on measuring the entire application as a whole, whereas the **_low level_** metrics would be more focused on understanding the individual components within the application.

## Metrics Grouped by Personas

Based on the different personas involved in Project Meteor and identified [here](https://github.com/AICoE/meteor/blob/main/docs/personas.md), we can categorize the metrics as follows:

<table>
  <tr>
   <td><strong>Metrics</strong>
   </td>
   <td><strong>Metric Definition</strong>
   </td>
   <td><strong>Metric Calculation</strong>
   </td>
   <td><strong>Targeted Persona</strong>
   </td>
   <td><strong>Data Source</strong>
   </td>
  </tr>
  <tr>
   <td><strong># New users (daily/weekly/monthly)</strong>
   </td>
   <td>Number of new users over time
   </td>
   <td>
   </td>
   <td>Product Owner
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Product Adoption rate
</strong>
   </td>
   <td>How many people adopt the product and become regular users
   </td>
   <td>(New Users ÷ Total Users) * 100
   </td>
   <td>Product Owner
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>User Retention Rate</strong>
   </td>
   <td>Rate of users retained over time
   </td>
   <td>(# Users end of given period)-(# New users acquired in the period) / (#Users in the beginning of the period) * 100
   </td>
   <td>Product Owner
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Daily/Monthly Active Users (DAU/MAU)</strong>
   </td>
   <td>Number of active users daily/monthly
   </td>
   <td>
   </td>
   <td>Product Owner
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Product Stickiness Ratio</strong>
   </td>
   <td>Measures the number of people that are highly engaged with the product
   </td>
   <td>(DAU) / (MAU) * 100
   </td>
   <td>Product Owner
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Product Engagement Score (PES)</strong>
   </td>
   <td>How users are interacting with your product
   </td>
   <td>(Adoption + Retention + DAU/MAU) / 3 *100
   </td>
   <td>Product Owner
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>Number of sessions/user</strong>
   </td>
   <td>How often users come back and use the site
   </td>
   <td>(Total # sessions) / (Total # users)
   </td>
   <td>Analyst
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Number of user actions/session</strong>
   </td>
   <td>Which actions a user made and which feature(s) they used while using the app
   </td>
   <td>
   </td>
   <td>Analyst
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Session duration</strong>
   </td>
   <td>Measures product usage
   </td>
   <td>(Total time spent by users in the product)/(Total users)
   </td>
   <td>Analyst
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Bounce rate</strong>
   </td>
   <td>Percentage of users who visited only one page of a website or app and left
   </td>
   <td>
   </td>
   <td>Analyst
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Web app traffic</strong>
   </td>
   <td>General number of people who found and visited the web app
   </td>
   <td>
   </td>
   <td>Analyst
   </td>
   <td>Google Analytics
   </td>
  </tr>
  <tr>
   <td><strong>Customer Satisfaction Score (CSAT)</strong>
   </td>
   <td>How satisfied a customer/user is with overall experience of product
   </td>
   <td>User provides rating on a 1-5 level (1 unsatisfied, 5 highly satisfied) \
 \
Avg of 1-5 scores <strong>or</strong>
<p>
(# 4-5 scores)/(Total response volume) * 100
   </td>
   <td>Analyst
   </td>
   <td>Feedback Survey
   </td>
  </tr>
  <tr>
   <td><strong>Availability</strong>
   </td>
   <td>Probability that the product is operational at a given time
   </td>
   <td>(Time product is operating) / (total time it should be operating)
   </td>
   <td>Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Avg Response Time</strong>
   </td>
   <td>Total time it takes to respond to a request for the app service
   </td>
   <td>(Total time taken to respond during the selected time period) / (# Responses in the selected time period)
   </td>
   <td>Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>JH login success rate</strong>
   </td>
   <td>Measures successful product logins
   </td>
   <td>(# Successful JH logins)/ \
(# Total JH logins)
   </td>
   <td>Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong># API request per minute (RPM)</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Time taken to build images</strong>
   </td>
   <td>Time taken for AICoE CI to complete image builds
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Time taken to spawn JH/Elyra image</strong>
   </td>
   <td>Time taken for AICoE CI to spawn JH/Elyra image
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Runtime of Thoth advisor to install/manage dependencies</strong>
   </td>
   <td>Thoth advisor runtime for dependency management
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Successful image tag release rate</strong>
   </td>
   <td>(Number of tag releases successfully completed)/(Total # tag releases)
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Avg time taken for tag releases</strong>
   </td>
   <td>(Sum of time taken by each tag release) / (Total # tag releases)
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Avg Tekton build pipeline completion time</strong>
   </td>
   <td>(Sum of each build pipeline completion time) / (Total # pipelines)
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>Avg overlay build time</strong>
   </td>
   <td>(Sum of each overlay build time) / (Total # overlay builds)
   </td>
   <td>
   </td>
   <td>Technical Architect/Operations
   </td>
   <td>Prometheus
   </td>
  </tr>
  <tr>
   <td><strong>ML model accuracy</strong>
   </td>
   <td>Accuracy of trained ML model i.e ROC, precision etc
   </td>
   <td>
   </td>
   <td>Data Scientist
   </td>
   <td>TBD
   </td>
  </tr>
  <tr>
   <td><strong>Model deployment time</strong>
   </td>
   <td>Time taken for model to be deployed
   </td>
   <td>
   </td>
   <td>Data Scientist
   </td>
   <td>TBD
   </td>
  </tr>
  <tr>
   <td><strong>ML deployment endpoint latency</strong>
   </td>
   <td>Latency of deployment endpoint
   </td>
   <td>
   </td>
   <td>Data Scientist
   </td>
   <td>TBD
   </td>
  </tr>
  <tr>
   <td><strong>Model deployment CPU/Memory usage </strong>
   </td>
   <td>CPU/Memory usage for model deployment
   </td>
   <td>
   </td>
   <td>Data Scientist
   </td>
   <td>TBD
   </td>
  </tr>
</table>
