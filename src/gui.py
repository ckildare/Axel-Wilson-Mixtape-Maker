import sys
import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

# Set Up GUI
def window():
   app = QApplication(sys.argv)
   w = QWidget()
   b = QLabel(w)

   b.setText("Hello World!")
   #(x, y) Placement (x, y) Size
   w.setGeometry(100,100,600,800)


   b.move(50,20)
   w.setWindowTitle("axel-wilson's-mixtape-maker.exe")
   w.show()
   sys.exit(app.exec_())
if __name__ == '__main__':
   window()