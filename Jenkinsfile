pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }
    agent any

    environment {
                SONAR_HOST_URL     = "http://172.31.57.99:9000"
                DEV_TOKEN = credentials('DEV_TOKEN')				
    }
        stages {
			stage("Checkout"){
				steps {
					script {
					    checkout changelog: false, poll: false, scm: [$class: 'GitSCM', branches: [[name: 'dev']], extensions: [[$class: 'CleanBeforeCheckout']], userRemoteConfigs: [[credentialsId: 'Git credentials', url: 'https://github.com/hvemulapalli/CISC699.git']]]
						sh "pwd; echo $HOME"
						stash name: "repository", includes: "**"
					}
				}
			}
        stage('Sonarqube Analysis') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli:4.2'
                    args '--entrypoint='
                }
            }
            steps {
                script {
                    unstash "repository"
                    echo "Sonar Scan"
                    sh '''
                    pwd;ls -ltrh
                    /opt/sonar-scanner/bin/sonar-scanner \
                        -Dsonar.projectKey=dev \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${SONAR_HOST_URL} \
                        -Dsonar.login=${DEV_TOKEN}
                    '''
                }
            }
        }
			stage('NPM Dependency Install') {	
				steps {
					script {
					    unstash "repository"
						sh '''
						pwd; echo $HOME; ls -ltrh
						docker build -t application-dev:latest .
						'''
					}
				}
			}
			stage("Deploy"){
				steps {
					script {
						sh '''
						if [ "$( docker container inspect -f '{{.State.Running}}' dev )" == "true" ] 
						then docker stop dev ; docker rm -f dev ; docker run --name dev -p 3000:3000 -tid application-dev:latest ; 
						else docker rm -f dev ;docker run --name dev -p 3000:3000 -tid application-dev:latest ; 
						fi
						'''
					}
				}
			}
			
        }
}
