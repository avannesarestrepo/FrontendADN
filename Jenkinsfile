@Library('ceiba-jenkins-library') _


pipeline {
  //Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  //Opciones específicas de Pipeline dentro del Pipeline
  options {
    	buildDiscarder(logRotator(numToKeepStr: '5'))
 	disableConcurrentBuilds()
  }

  //Una sección que define las herramientas “preinstaladas” en Jenkins
  tools {
	nodejs 'NodeJS16'
  }

  //Aquí comienzan los “items” del Pipeline
  stages{
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout([
			$class: 'GitSCM',
			branches: [[name: '*/master']],
			doGenerateSubmoduleConfigurations: false,
			extensions: [],
			gitTool: 'Default',
			submoduleCfg: [],
			userRemoteConfigs: [[
				credentialsId: 'GitHub_avannesarestrepo',
                url:'https://github.com/avannesarestrepo/FrontendADN.git'
				
			]]
		])

      }
    }

    stage('NPM Install') {
      steps {
        echo "------------>Installing<------------"
        sh 'npm install'
      }
    }

    stage('Unit Test') {
      steps {
        echo "------------>Testing<------------"
        sh 'npm run test'
      }
    }
	
    stage('Test end-to-end') {
      steps{
        echo "------------>Testing Protractor<------------"
        sh 'npm run e2e'
      }
    }


    stage('Static Code Analysis') {
      steps{
		sonarqubeMasQualityGatesP(sonarKey: 'co.com.ceiba.adn:sistema.control.parqueadero.front.angie.restrepo',
		sonarName: 'ADN-SistemaControlParqueadero-Front[angie.restrepo]',
		sonarPathProperties: './sonar-project.properties'
      }
    }

    stage('Build') {
      steps {
        echo "------------>Build<------------"
		sh 'npm run build'
      }
    }
  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
	    mail (
        to: 'angie.restrepo@ceiba.com.co',
        subject: "Failed Pipeline:${currentBuild.fullDisplayName}",
        body: "Something is wrong with ${env.BUILD_URL}"
		  )
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}