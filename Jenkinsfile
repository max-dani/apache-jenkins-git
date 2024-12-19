pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                // Clone the code from the current branch
                checkout scm
            }
        }
        stage('Deploy to Apache') {
            steps {
                script {
                    // Determine the target directory based on the branch name
                    def targetDir = ''
                    if (env.BRANCH_NAME == 'main') {
                        targetDir = '/var/www/html/main'
                    } else if (env.BRANCH_NAME == 'development') {
                        targetDir = '/var/www/html/dev'
                    } else {
                        error("Branch '${env.BRANCH_NAME}' is not configured for deployment.")
                    }

                    // Create the target directory if it doesn't exist
                    sh """
                    sudo mkdir -p ${targetDir}
                    sudo cp university.html ${targetDir}/
                    sudo systemctl reload apache2
                    """
                }
            }
        }
    }
}
