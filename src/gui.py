import sys
import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

# Set Up GUI
class UIWindow(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 1000, 100)
        MainWindow.setFixedSize(800, 500)
        MainWindow.setWindowTitle("axel-wilson's-mixtape-maker")
        self.centralwidget = QWidget(MainWindow)

        # mainwindow.setWindowIcon(QtGui.QIcon('PhotoIcon.png'))

        self.exitButton = QPushButton('Exit', self.centralwidget)
        self.exitButton.move(730, 480)
        MainWindow.setCentralWidget(self.centralwidget)


class Tutorial(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 200, 450)
        MainWindow.setFixedSize(800, 500)
        MainWindow.setWindowTitle("axel-wilson's-mixtape-maker-tutorial")
        self.centralwidget = QWidget(MainWindow)
        self.exitButton = QPushButton("Exit", self.centralwidget)
        self.exitButton.move(660, 480)
        self.returnButton = QPushButton('Exit', self.centralwidget)
        self.returnButton.move(660, 480)
        MainWindow.setCentralWidget(self.centralwidget)

class SongView(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 200, 450)
        MainWindow.setFixedSize(800, 500)
        MainWindow.setWindowTitle("axel-wilson's-mixtape-maker")
        self.centralwidget = QWidget(MainWindow)
        self.exitButton = QPushButton("Exit", self.centralwidget)
        self.exitButton.move(730, 480)
        MainWindow.setCentralWidget(self.centralwidget)


class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        self.mainWindow = UIWindow()
        self.tutorial = Tutorial()
        self.startMainWindow()

    def startTutorial(self):
        self.tutorial.setupUI(self)
        self.tutorial.exitButton.clicked.connect(QCoreApplication.instance().quit)
        self.show()

    def startSongView(self):
        self.songView.setupUI(self)
        self.songView.exitButton.clicked.connect(QCoreApplication.instance().quit)
        self.show()

    def startMainWindow(self):
        self.mainWindow.setupUI(self)
        self.mainWindow.exitButton.clicked.connect(QCoreApplication.instance().quit)
        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = MainWindow()
    sys.exit(app.exec_())


app = QApplication(sys.argv)
i = Index()
i.show()
app.exec()

# QCoreApplication.instance().quit