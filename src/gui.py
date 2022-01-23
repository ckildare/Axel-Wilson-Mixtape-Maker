import sys
import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

# Set Up GUI
class UIWindow(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 1000, 100)
        MainWindow.setFixedSize(400, 450)
        MainWindow.setWindowTitle("UIWindow")
        self.centralwidget = QWidget(MainWindow)
        # mainwindow.setWindowIcon(QtGui.QIcon('PhotoIcon.png'))
        self.ToolsBTN = QPushButton('text', self.centralwidget)
        self.ToolsBTN.move(50, 350)
        MainWindow.setCentralWidget(self.centralwidget)


class Tutorial(object):
    def setupUI(self, MainWindow):
        MainWindow.setGeometry(50, 50, 200, 450)
        MainWindow.setFixedSize(400, 450)
        MainWindow.setWindowTitle("Tutorial")
        self.centralwidget = QWidget(MainWindow)
        self.CPSBTN = QPushButton("text2", self.centralwidget)
        self.CPSBTN.move(100, 350)
        MainWindow.setCentralWidget(self.centralwidget)


class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        self.mainWindow = UIWindow()
        self.uiToolTab = UIToolTab()
        self.startMainWindow()

    def startTutorial(self):
        self.uiToolTab.setupUI(self)
        self.uiToolTab.CPSBTN.clicked.connect(self.startMainWindow)
        self.show()

    def startMainWindow(self):
        self.mainWindow.setupUI(self)
        self.mainWindow.ToolsBTN.clicked.connect(self.startTutorial)
        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = MainWindow()
    sys.exit(app.exec_())


app = QApplication(sys.argv)
i = Index()
i.show()
app.exec()