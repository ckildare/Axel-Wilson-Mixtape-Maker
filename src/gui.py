import sys
import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *


class UIWindow(object):
    def setAsMainWindow(self, mainWindow):
        self.centralwidget = QWidget()

        # Exit Button
        self.exitButton = QPushButton('Exit', self.centralwidget)
        self.exitButton.move(730, 480)

        # Tutorial Button
        self.tutorialButton = QPushButton('Tutorial', self.centralwidget)
        self.tutorialButton.move(660, 480)

        # Exit button
        self.exitButton.clicked.connect(
            QCoreApplication.instance().quit)

        # Tutorial button
        self.tutorialButton.clicked.connect(mainWindow.startTutorial)

        # Set as main content of window
        mainWindow.setCentralWidget(self.centralwidget)
        mainWindow.setGeometry(50, 50, 1000, 100)
        mainWindow.setFixedSize(800, 500)
        mainWindow.setWindowTitle("axel-wilson's-mixtape-maker")
        mainWindow.show()


class Tutorial(object):
    def setAsMainWindow(self, mainWindow):
        self.centralwidget = QWidget(mainWindow)

        # Exit Button
        self.exitButton = QPushButton("Exit", self.centralwidget)
        self.exitButton.move(730, 480)

        # Return Button
        self.returnButton = QPushButton('Return', self.centralwidget)
        self.returnButton.move(660, 480)

        # Exit button
        self.exitButton.clicked.connect(
            QCoreApplication.instance().quit)

        # Return button
        self.returnButton.clicked.connect(mainWindow.startMainWindow)

        # Set as main content
        mainWindow.show()
        mainWindow.setGeometry(50, 50, 200, 450)
        mainWindow.setFixedSize(800, 500)
        mainWindow.setWindowTitle("axel-wilson's-mixtape-maker-tutorial")
        mainWindow.setCentralWidget(self.centralwidget)


class SongView(object):
    def setAsMainWindow(self, mainWindow):
        self.centralwidget = QWidget(mainWindow)

        # Exit Button
        self.exitButton = QPushButton("Exit", self.centralwidget)
        self.exitButton.move(730, 480)

        # Return Button
        self.returnButton = QPushButton(
            'Return Without Saving', self.centralwidget)
        self.returnButton.move(660, 480)

        # Exit button
        self.exitButton.clicked.connect(
            QCoreApplication.instance().quit)

        # Return button
        self.returnButton.clicked.connect(self.startMainWindow)

        # Set as main content
        mainWindow.setCentralWidget(self.centralwidget)
        mainWindow.setGeometry(50, 50, 200, 450)
        mainWindow.setFixedSize(800, 500)
        mainWindow.setWindowTitle("axel-wilson's-mixtape-maker")

        mainWindow.show()


class Index(QMainWindow):
    def __init__(self, parent=None):
        super(Index, self).__init__(parent)
        self.mainWindow = UIWindow()
        self.tutorial = Tutorial()
        self.songVIew = SongView()
        self.startMainWindow()

    def startTutorial(self):
        self.tutorial.setAsMainWindow(self)

    def startSongView(self):
        self.songVIew.setAsMainWindow(self)

    def startMainWindow(self):
        self.mainWindow.setAsMainWindow(self)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = Index()
    sys.exit(app.exec_())


app = QApplication(sys.argv)
i = Index()
i.show()
app.exec()
