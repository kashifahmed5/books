pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="737971166371"
        AWS_DEFAULT_REGION="us-east-1" 
        IMAGE_REPO_NAME="books"
        IMAGE_TAG="latest"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }
   
    stages {
        
         stage('Logging into AWS ECR') {
            steps {
                script {
                sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
                 
            }
        }
        
        stage('Cloning Git') {
            steps {
                 checkout([$class: 'GitSCM', branches: [[name: '**']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-privat-key', url: 'git@github.com:kashifahmed5/books.git']]])      
            }
        }
  
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_TAG}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
                sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
         }
        }
      }
      stage('login k8s'){
        steps{
            sh"aws eks --region us-east-1 update-kubeconfig --name EKS_CLUSTER"
        }
    }
    stage('deployment') {
     steps{  
         script {
            sh"aws --region us-east-1 eks get-token --cluster-name EKS_CLUSTER"
            sh"kubectl apply -f eks_cicd/deployment.yaml"
            sh"kubectl rollout restart -f  eks_cicd/deployment.yaml "
            
              
         }
      }
    }
       stage('service') {
     steps{  
         script {
            
            sh"kubectl apply -f eks_cicd/service.yaml"
              
         }
      }
    }
       stage('ingress') {
     steps{  
         script {
            
            sh"kubectl apply -f  eks_cicd/ingress.yaml  -o yaml"
              
         }
      }
    }
    }
}
