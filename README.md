
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

![TOSCA Lightning](docs/logo.png)

[**Welcome**](#welcome) &nbsp;|&nbsp; [**Quickstart**](#quickstart) &nbsp;|&nbsp; [**Get In Touch**](#get-in-touch) &nbsp;|&nbsp; [**Learn More**](#learn-more)

---

## Welcome

TOSCA as a standardized cloud modeling language is not widely used in industry.
Concrete deployment automation technologies, such as Kubernetes, Ansible, Terraform, or AWS CloudFormation, are much more common as they often provide comprehensive tooling and support for working in modern software engineering environments.

To make TOSCA more attractive to practitioners, we introduce the **TOSCA Lightning** toolchain as *a modeling and transformation system for porting TOSCA to production-ready deployment technologies*.

**Why choose a particular deployment automation technology when TOSCA Lightning supports them all?**

In our recent research, we identified the essential modeling parts that are supported by all deployment automation technologies.
Thereby, we introduced the essential deployment metamodel (EDMM) providing a common understanding and technology-independent baseline of declarative deployment models.
Moreover, EDMM enacts the transformation from a common metamodel into technology-specific deployment models including all required files and artifacts.

Therefore, we published the *TOSCA Light modeling profile* as a reduced subset of TOSCA modeling constructs which is compliant with EDMM.
By using the TOSCA Lightning toolchain, practitioners are able to model their applications in an abstract and technology-agnostic modeling language syntax and can still use their deployment automation technology of choice for execution.

The toolchain consists of the [TOSCA Lightning Modeling Environment](https://github.com/eclipse/winery) and the [EDMM Transformation Framework](https://github.com/UST-EDMM/transformation-framework).

#### TOSCA Lightning Modeling Environment

The TOSCA Lightning Modeling Environment is a web-based environment to graphically model TOSCA-based application topologies.
It provides a *Management Interface* to manage all TOSCA related entities, such as node types, their property definitions, operations, and artifacts.
Further, it provides a *Topology Modeler* component which enables the graphical composition of the application and its desired target state to be deployed.

The TOSCA Lightning Modeling Environment checks the TOSCA Light compliance when a user opens a TOSCA service template.
Each created or imported TOSCA model may be flagged as TOSCA Light compliant by showing a respective TOSCA Light logo at the top.
The user has access to a list of violated conditions when a TOSCA service template is not compliant with TOSCA Light.

#### EDMM Transformation Framework

The EDMM Transformation Framework provides the ability to transform a given TOSCA Light model into a set of files and artifacts required by a certain deployment automation technology.
Together with the model, a user selects a certain target deployment technology and the framework generates the respective files and templates.
However, the EDMM Transformation Framework is plugin-based and, among others, supports technologies such as Kubernetes, Terraform, or Ansible ([full list](https://github.com/UST-EDMM/transformation-framework#plugins)).



## Quickstart

For a quick start, we outline a step-by-step guide to model, transform, and deploy a TOSCA Light application to **Kubernetes**.
For the sake of demonstration, we use the Spring PetClinic application which demonstrates the use of the Spring Boot framework.
It's a web application and runs on a Tomcat web server while connecting to a MySQL database to store its data.

The model is created using the TOSCA Lightning Modeling Environment.
Notably, the model is not specifically composed for Kubernetes as the target runtime environment.
It is rather modeled in a generic, component-based manner.
Afterwards, the resulting model is translated using the EDMM Transformation Framework CLI to the specific files and templates required by Kubernetes, e.g., Dockerfiles, deployment and service descriptors.

### Pre-requisites

* Docker 17.10.0-ce or later installed and running
* Docker Compose installed and set up

### Clone the TOSCA Lightning repository

```
git clone https://github.com/UST-EDMM/tosca-lightning
cd tosca-lightning
```

### Install the EDMM Transformation Framework CLI

Download the latest release:

```
curl -LSs -o edmm.zip https://github.com/UST-EDMM/transformation-framework/releases/download/v1.0.5/edmm.zip
```

Unzip archive to current directory:

```
unzip edmm.zip -d .
```

### Run the TOSCA Lightning Modeling Environment

```
docker-compose pull
docker-compose up -d
```

Open a browser a go to <http://localhost:8080> to launch the modeling environment.

The TOSCA Lightning Modeling Environment is started in the *Service Template List* view.
For the Quickstart, we prepared a TOSCA deployment model of the Spring PetClinic application.

By clicking on the *PetClinic* Service Template, you enter the *Service Template Detail* view.

![](docs/quickstart/01-petclinic.png)

In the *Topology Template* submenu, you can open the *Topology Editor*.
The Topology Editor is launched in a separate window.

In this view, the overall structure of the application is modeled.
Further, the Topology Editor is used to set any property value which will be used as configuration for the instantiation of the component.

![](docs/quickstart/02-topology.png)

The Quickstart repository comes already with a set of *built-in modeling types* that can be used to model new applications.
New Service Templates can be added where applications can be composed using the built-in types on the left hand side of the Topology Editor.
However, these types follow the proposed normative types by the TOSCA Simple Profile standard.
In addition, new types can be added using the *Node Type* view of the TOSCA Light Modeling Environment.

### Export the PetClinic Application

You can now go back to the *Service Template Detail* view of the PetClinic application.

Click the *Export* button and execute the *Export to EDMM* action.
The result is opened in a new browser window.

Right-click *Save as...* and save the YAML model relative to your `tosca-light` repository, e.g., to `petclinic.yml`.

### Transform to Kubernetes

Now we can use the EDMM Transformation Framework CLI to translate the generated model into files and artifacts required by Kubernetes for deployment.

> **Workaround: Correct file specs in `petclinic.yml`**
>
> The TOSCA Lightning Modeling Environment prototype at this stage generates absolute path based on the container's volume mount.
> To have relative file specs, relative to your `tosca-lightning` repository, you can execute the following command to fix this:
>
> ```
> sed -i 's/\/var\/opentosca\/repository/\.\/modeling-repository/' petclinic.yml
> ```

Finally, we can execute the transformation to Kubernetes using the following command:

```
./edmm transform kubernetes ./petclinic.yml
```

### Run the PetClinic Application on Kubernetes

> **Kubernetes on HyperV using minikube**
>
> Start a PowerShell with administrative rights and start a Kubernetes cluster:
>
> ```
> minikube start --cpus 2 --memory 4096 --vm-driver=hyperv
> ```
>
> Configure PowerShell to use minikube's Docker environment
>
> ```
> minikube docker-env | Invoke-Expression
> ```

Build Docker images on your Kubernetes cluster:

```
docker build -t db ./kubernetes/db
docker build -t pet-clinic ./kubernetes/pet_clinic
```

Apply the generated Kubernetes configuration:

```
kubectl apply -f ./kubernetes/db/db-deployment.yaml -f ./kubernetes/db/db-service.yaml
kubectl apply -f ./kubernetes/pet_clinic/pet-clinic-deployment.yaml -f ./kubernetes/pet_clinic/pet-clinic-service.yaml
```

Launch the PetClinic application:

```
minikube service pet-clinic-service
# or monitor
minikube dashboard
```

Shutdown the minikube cluster:

```
minikube stop
minikube delete
```



## Get In Touch

Are you interested in our research, do you have any questions or would you like further information?
Just get in touch with us below:

* Michael Wurster ([@miwurster](https://github.com/miwurster), [write a mail](mailto:wurster@iaas.uni-stuttgart.de?subject=[GitHub]%20TOSCA%20Lightning))



## Learn More

* Michael Wurster, Uwe Breitenbücher, Michael Falkenthal, Christoph Krieger, Frank Leymann & Karoline Saatkamp:
  [**The Essential Deployment Metamodel: A Systematic Review of Deployment Automation Technologies**](https://link.springer.com/article/10.1007%2Fs00450-019-00412-x).
  In: SICS Software-Intensive Cyber-Physical Systems (2019)
* Michael Wurster, Uwe Breitenbücher, Antonio Brogi, Ghareeb Falazi, Lukas Harzenetter, Frank Leymann, Jacopo Soldani and Vladimir Yussupov:
  [**The EDMM Modeling and Transformation System**](https://www.iaas.uni-stuttgart.de/publications/ICSOC-2019-The-EDMM-Modeling-and-Transformation-System.pdf).
  In: Service-Oriented Computing - ICSOC 2019 Workshops
* Michael Wurster, Uwe Breitenbücher, Lukas Harzenetter, Frank Leymann, Jacopo Soldani and Vladimir Yussupov:
  **TOSCA Light: Bridging the Gap Between TOSCA Specification and Production-Ready Deployment Technologies**.
  In: Proceedings of the 10th International Conference on Cloud Computing and Services Science (CLOSER), 2020 **(To Appear)**



## Architecture and Toolchain

![Toolchain](docs/toolchain.png)
