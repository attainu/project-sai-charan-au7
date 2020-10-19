1) What is the CAP theorem? Differentiate between forward proxy and reverse proxy. 

	CAP Theorem:
		 CAP stands for Consistency, Availability and Partition Tolerance.
Consistency: All nodes see the same data at the same time. What you write you get to read.
Availability: A guarantee that every request receives a response about whether it was successful or failed. Whether you want to read or write you will get some response back.
Partition tolerance: The system continues to operate despite arbitrary message loss or failure of part of the system. Irrespective of communication cut down among the nodes, the system still works.
Differentiate between forward proxy and reverse proxy.
Forward proxies which have capability of hiding the clients IP Address and sends request and when the response is received it will revert back to the same IP which initiated a request.Applicable for both server & client.
	Reverse Proxies is developed for web browsers which helps to provide privacy for web servers ,its applicable only on client side



2) What is Caching and what are the different types of cache. What are the different ways to update cache?
	Caching is the process of storing data in the cache. The cache is a temporary storage area relatively small in size with faster access time.Caching improves latency and can reduce the load on your servers and databases.
Types:
Browser caching
View page caching
Object caching
Database caching

Ways to cache:
Proactive Caching
Reactive Caching

3) Differentiate between RPC and REST. 

	RPC stands for Remote Procedure Call and REST stands for Representational State Transfer.

RPC(Pros):
	
Dealing with irregular data and exceptional situations.
Dealing with operation without data.
Quickstart. You don’t have to design a full schema from first.
Fine gained control. You can represent whatever level of operation you need.
Gradual improvement. It’s easier to deprecate a single function.
REST (Pros):
Semantics are well-known. So you don’t have to teach much.
Schema is explicit. Easier to understand.


4) Explain OWASP Top 10 vulnerabilities
Injection:
Injecting hostile data that can trick the interpreter into executing the unintended commands or accessing data without proper authentication

Broken Authentication:
Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users’ identities temporarily or permanently.

Sensitive Data Exposure: 
The sensitive data of the users should be protected. The sensitive data in the websites through which they are transferred to clients by using REST or some manner also should be protected with encryption.

XML External Entities: 
External entities can be used to disclose internal files using the file URI handler, internal file shares, internal port scanning, remote code execution, and denial of service attacks.
Broken access Control:
Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users’ accounts, view sensitive files, modify other users’ data, change access rights, etc.
Security Misconfiguration: 
Security misconfiguration some thing like HTTP headers, and verbose error messages containing sensitive information.
Cross-Site Scripting XSS:
Attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user.

Insecure Deserialization: 
Insecure deserialization often leads to remote code execution. Even if deserialization flaws do not result in remote code execution, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks.
Using Components with known vulnerabilities : 
Using packages or libraries in our application having known vulnerabilities with un patch flaws can lead an attacker to attack using those vulnerabilities and leak sensitive information or taking the server into their control.
Insufficient logging and monitoring: 
This means the logging and monitoring should properly be done at every possible or defective entry so that we can find the attacks easily. The report says that the breach was detected over 200 days.

5) What is HTTP? Differentiate between HTTP and TCP. Differentiate between GET, POST, PUT and PATCH.

	HTTP: HyperText Transfer Protocol is an application protocol for distributed, collaborative, hypermedia information systems that allows users to communicate data on the World Wide Web.
TCP is a transport-layer protocol, and HTTP is an application-layer protocol that runs over TCP.
GET: to retrieve data from server
POST: to submit data to server
PUT: To write some data to server
DELETE : To delete something from server

