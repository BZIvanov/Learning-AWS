# AWS Regions

You can check the list with regions by click the already selected region top left on your screen.
<img src="./pics/regions-button.png" alt="drawing" width="700"/>

Every service is living in specific region (except some). For example if you have already selected Ohio region and then for example Lambda service, you will see only lambdas you have in that region, not from other regions in case you also have.

And some services are global, for example IAM. If you select IAM service regions list will be greyed out and not selectable, because it is global service.

### Regions

- regions are all around the world
- they are named like us-east-1, us-west-2, etc...
- a region is a cluster of data centers
- not all amazon services are available in all of the regions

### Availability Zones (AZ)

- each region has multiple AZs (minimum 3, maximum 6, usually 3)
- AZs are data centers for 1 region, but working in isolation from one another in case of some kind of disaster.

### Points of Presence (Edge locations)

Points of Presence (PoPs) in AWS are geographically distributed data center locations that enhance the performance and availability of AWS services by reducing latency and improving content delivery, DNS resolution, and network optimization for end-users.
