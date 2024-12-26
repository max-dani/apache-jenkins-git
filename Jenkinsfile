pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps { 
                    git branch: 'main', url: 'https://github.com/max-dani/apache-jenkins-git.git' } }
        stage('Build') {
            steps {
                // Add any build steps if necessary
                echo 'Building...'
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'AWS_Apache',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**/*',
                                    removePrefix: '',
                                    remoteDirectory: 'tourism_website',
                                    execCommand: '''
                                        cp -r tourism_website/
                                        sudo systemctl restart apache2
                                    '''
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
