+++
title = 'Analisi'
slug = "analisi"
date = 2024-10-06T06:37:53+02:00
draft = false
math = true
hideBackToTop = true
+++

Tratteremo in questa pagina di una piccola parte di analisi I e di quasi ogni cosa ci si possa imbattere in Analisi II. Le due materie sono state trattate insieme al professore **Basilio Messano**.

# Massimi e minimi, primo esempio

$$f_{x}=x^3+3xy^2-15x-12y$$

Calcoliamo le derivate prime : 

$$\cdot f_{x}=3x^{2}+3y^{2}-15$$

$$=x^{2}+y^{2}-5$$

$$\cdot f_{y}=6xy-12$$
  
$$=xy-2$$

Mettiamo al sistema le due derivate : 

$$\begin{Bmatrix}
x^{2}+y^{2}=5\\\\
y=\frac{2}{x}
\end{Bmatrix}$$
$$\begin{Bmatrix}
x^{2}+\frac{4}{x^{2}}=5\\\\
y=\frac{2}{x}
\end{Bmatrix}$$

Dopo aver risolto questo sistema troviamo due punti, 

$$P_1=(1,2)$$
$$P_2=(-1,-2)$$

Ora calcoliamo le derivate seconde : 

$$f_{xx}=6x$$
$$f_{yy}=6x$$
$$f_{xy}=6y$$

Adesso calcoliamo gli hessiani nei due punti 

$$H(P_{1})=\begin{vmatrix}
6x & 6y\\\\
6y & 6x
\end{vmatrix}
=36-144<0$$

Dato che il primo valore dell'hessiano e' positivo e il determinante e' negativo, il punto P1 sara' di sella 

$$H(P_{2})=\begin{vmatrix}
6x & 6y\\\\
6y & 6x
\end{vmatrix}
=36-144<0$$

Cosi' come in P1 avremo un punto di sella

# Massimi e minimi, secondo e ultimo esempio

$$f_{x,y}=e^y(4x^2+y^2)$$

Calcoliamo le derivate prime :

$$ f_{x}=8xe^{y}$$
$$ f_{y}=e^{y}(4x^2+y^2+2y)$$
$$\begin{Bmatrix}
8xe^{y}=0\\\\
e^{y}(4x^2+y^2+2y)=0
\end{Bmatrix}$$

$$\begin{Bmatrix}
8x=0\\\\
4x^2+y^2+2y=0
\end{Bmatrix}$$

$$\begin{Bmatrix}
x=0\\\\
y^2+2y=0
\end{Bmatrix}$$

Dopo aver risolto questo sistema troviamo due punti,

$$P_1=(0,0)$$
$$P_2=(0,-2)$$

Ora calcoliamo le derivate seconde :

$$f_{xx}=8e^{y}$$
$$f_{yy}=e^{y}(4x^2+y^2+4y+2)$$
$$f_{xy}=8xe^{y}$$

Adesso calcoliamo gli hessiani nei punti individuati

$$H(P_{1})=\begin{vmatrix}
8e^{y} & 8xe^{y}\\\\
8xe^{y} & e^{y}(4x^2+y^2+4y+2)
\end{vmatrix}
=16>0$$

$$H(P_{2})=\begin{vmatrix}
8e^{y} & 8xe^{y}\\\\
8xe^{y} & e^{y}(4x^2+y^2+4y+2)
\end{vmatrix}
=-1.17<0$$

Dato che il primo valore dell'hessiano e' positivo e il determinante e' positivo, il punto P1 sara' di minimo mentre P2 sarà un massimo relativo

***
Ora, come prima cosa, si presenterà il libro teorico relativo ad Analisi II:

{{< embed-pdf url="https://ivanodapice.github.io/appunti/APPUNTI-DEL-CORSO-DI-ANALISI-MATEMATICA-II.pdf" >}}
***
E infine due risorse relative ad esercizi vari:

{{< embed-pdf url="https://ivanodapice.github.io/appunti/Analisi-Matematica-2-Esercizi-(M.Boella).pdf" >}}

{{< embed-pdf url="https://ivanodapice.github.io/appunti/ESERCIZIO-SUL-PROBLEMA-DI-CAUCHY-PER-UN'EQUAZIONE-DIFFERENZIALE -LINEARE-A-COEFFICIENTI-COSTANTI.pdf" >}}

> Corso Triennale di **Ingegneria Edile** (L-23), Università degli Studi di Napoli **Federico II**