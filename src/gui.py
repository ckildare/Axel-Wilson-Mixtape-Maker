import sys
import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

# Set Up GUI
class UIWindow(object):
    def setupUI(self, MainWindow):
        # Sizing
        MainWindow.setGeometry(50, 50, 1000, 100)
        MainWindow.setFixedSize(800, 500)
        MainWindow.setWindowTitle("axel-wilson's-mixtape-maker")
        self.centralwidget = QWidget()

        # mainwindow.setWindowIcon(QtGui.QIcon('PhotoIcon.png'))

        # Exit Button
        self.exitButton = QPushButton('Exit', self.centralwidget)
        self.exitButton.move(730, 480)
        
        # Tutorial Button
        self.tutorialButton = QPushButton('Tutorial', self.centralwidget)
        self.tutorialButton.move(660, 480)

        MainWindow.setCentralWidget(self.centralwidget)


class Tutorial(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 200, 450)
        MainWindow.setFixedSize(800, 500)
        MainWindow.setWindowTitle("axel-wilson's-mixtape-maker-tutorial")
        self.centralwidget = QWidget(MainWindow)

        # Exit Button
        self.exitButton = QPushButton("Exit", self.centralwidget)
        self.exitButton.move(730, 480)

        # Return Button
        self.returnButton = QPushButton('Return', self.centralwidget)
        self.returnButton.move(660, 480)

        MainWindow.setCentralWidget(self.centralwidget)

class SongView(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 200, 450)
        MainWindow.setFixedSize(800, 500)
        MainWindow.setWindowTitle("axel-wilson's-mixtape-maker")
        self.centralwidget = QWidget(MainWindow)

        # Exit Button
        self.exitButton = QPushButton("Exit", self.centralwidget)
        self.exitButton.move(730, 480)

        # Return Button
        self.returnButton = QPushButton('Return Without Saving', self.centralwidget)
        self.returnButton.move(660, 480)

        MainWindow.setCentralWidget(self.centralwidget)


class Index(QMainWindow):
    def __init__(self, parent=None):
        super(Index, self).__init__(parent)
        self.mainWindow = UIWindow()
        self.tutorial = Tutorial()
        self.startMainWindow()

    def startTutorial(self):
        self.tutorial.setupUI(self)
        self.tutorial.exitButton.clicked.connect(QCoreApplication.instance().quit)
        self.tutorial.returnButton.clicked.connect(self.startMainWindow)
        self.show()

    def startSongView(self):
        self.songView.setupUI(self)
        self.songView.exitButton.clicked.connect(QCoreApplication.instance().quit)
        self.songView.returnButton.clicked.connect(self.startMainWindow)
        self.show()

    def startMainWindow(self):
        self.mainWindow.setupUI(self)
        self.mainWindow.exitButton.clicked.connect(QCoreApplication.instance().quit)
        self.mainWindow.tutorialButton.clicked.connect(self.startTutorial)
        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = Index()
    sys.exit(app.exec_())


app = QApplication(sys.argv)
i = Index()
i.show()
app.exec()

# QCoreApplication.instance().quit