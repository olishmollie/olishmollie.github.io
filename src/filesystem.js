var fs = [
{ name: "~", files: [
{ name: "notes",
parent: "~",
files: [
{ name: "phasors.md",
data: `---
layout: page
title:  "Phasors"
usemathjax: true
---

# Motivation

Sometimes dealing with sinusoidal signals in the time domain can be a hassle. Consider finding the steady-state current of the circuit below, with $$v(t)=V_0
<p align="center">
    <img src="/rlc_circuit.png" alt="RLC Circuit"/>
</p>

From circuit theory, we know that the capacitor current is proportional to the derivative of the voltage, while the current across the inductor is the integral of the voltage. Therefore, using Kirchoff's voltage law,

$$v(t)=rac{1}{C}\int_{-\infty}^{t}i(x)dx+Lrac{	ext{d}i(t)}{	ext{d}t}+Ri(t)$$

I don't know about you, but that's not an integro-differential equation I can solve very easily. Luckily, thanks to [Charles Proteus Steinmetz](https://en.wikipedia.org/wiki/Charles_Proteus_Steinmetz), there's a better way.

# Derivation

If one were trying to find a simpler way to solve our problem, one might begin with the fact that this cicrcuit's input frequency equals its output frequency. We might therefore seek a time-independent quantity that carries the the magnitude and phase of the signal to simplify the analysis. A phasor is just such a quantity, and we'll use Euler's indentity to find it. We begin by recognizing that our cosine function is in fact the real part of a complex exponential.

$$
egin{align*}
v(t)&=\mathcal{Re}\{V_0e^{j(\omega{}t+\phi)}\}\
&=\mathcal{Re}\{V_0e^{j\omega{}t}e^{j\phi}\}\
nd{align*}
$$

Ignoring the time-dependent exponential, the phasor becomes $$V_0e^{j\phi}$$. The _phasor transform_ is carried out by representing a sinusoidal signal with its phasor, or

$$	ilde{V}=V_0e^{j\phi}=\mathcal{P}\{V_0
But why is it useful? To find out, let's take each element in our circuit and find its $$VI$$ relationship in phasor form. Beginning with the resistor, we start with Ohm's Law and perfrom the phase transform to both sides to obtain

$$
egin{align*}
v(t)&=RI_0&=\mathcal{Re}\{RI_0	ilde{V}&=R	ilde{I}
nd{align*}
$$

Next, let's perform similar steps with the inductor.

$$
egin{align*}
v(t)&=Lrac{	ext{d}}{	ext{d}t}I_0&=-\omega{}LI_0\sin(\omega{}t+\phi)\
&=-\omega{}LI_0&=-\omega{}L\mathcal{Re}\{I_0&=-\omega{}L	ilde{I}e^{-j\pi/2}\
	ilde{V}&=j\omega{}L	ilde{I}
nd{align*}
$$


where we have used the identity $$e^{-j\pi/2}=-j$$. Finally, we address the capacitor.

$$
egin{align*}
v(t)&=rac{1}{C}\int_{-\infty}^{t}I_0&=rac{1}{\omega{}C}I_0\sin(\omega{}t+\phi)\
&=rac{1}{\omega{}C}I_0&=rac{1}{\omega{}C}	ilde{I}e^{-j\pi/2}\
&=rac{-j}{\omega{}C}	ilde{I}\
	ilde{V}&=rac{1}{j\omega{}C}	ilde{I}
nd{align*}
$$

In the phasor representation, also known as the _frequency domain_, we define the concept of impedance to current flow, $$Z=	ilde{V}/	ilde{I}$$, for each of the above elements as

$$Z_R=R\qquad{}Z_L=j\omega{}L\qquad{}Z_C=rac{1}{j\omega{}C}$$

# Method

Let's revisit our original problem, this time replacing all the time-dependent quantities with phasors.

$$
egin{align*}
	ilde{V}&=rac{1}{j\omega{}C}	ilde{I}+j\omega{}L	ilde{I}+R	ilde{I}\
&=	ilde{I}(rac{1}{j\omega{}C}+j\omega{}L+R)\
nd{align*}
$$

Solving for current,

$$
egin{align*}
	ilde{I}&=rac{	ilde{V}}{R+j(\omega{}L-rac{1}{\omega{}C})}\
&=rac{	ilde{V}e^{-j	heta}}{\sqrt{R^2+(\omega{}L-rac{1}{\omega{}C})^2}}	ag{$	heta=	an^{-1}(rac{\omega{}L-rac{1}{\omega{}C}}{R})$}\
nd{align*}
$$

Now we can convert these quantities back into the time domain for the final solution.

$$
egin{align*}
i(t)&=\mathcal{Re}\{rac{	ilde{V}e^{-j	heta}}{\sqrt{R^2+(\omega{}L-rac{1}{\omega{}C})^2}}e^{j\omega{}t}\}\
&=rac{V_0}{\sqrt{R^2+(\omega{}L-rac{1}{\omega{}C})^2}}nd{align*}
`},
{ name: "testbench.md",
data: `---
layout: page
title: Writing a Verilog Test Bench
---

Let's write a test bench for an ALU. This ALU will have two 64 bit inputs, A and B, a 64 bit output W, a 1 bit output Zero (asserted when the output is zero), and a 4 bit control signal Ctrl with the following truth table:

| Operation | Ctrl | W |
| --- | --- | --- |
| AND | 0000 | A & B |
| OR | 0001 | A \| B |
| ADD | 0010 | A + B |
| LSL | 0011 | A << B |
| LSR | 0100 | A >> B |
| SUB | 0110 | A - B |
| PassB | 0111 | B |

The verilog for the ALU is shown below.

\`\`\`verilog
// alu.v
\`timescale 1ns / 1ns

\`define AND 4'b0000
\`define OR 4'b0001
\`define ADD 4'b0010
\`define LSL 4'b0011
\`define LSR 4'b0100
\`define SUB 4'b0110
\`define PassB 4'b0111

module alu(W, Zero, A, B, Ctrl);

   parameter n = 64;

   output [n-1:0] W;
   output          Zero;
   input [n-1:0]   A, B;
   input [3:0]     Ctrl;

   reg [n-1:0]     W;

   always @(Ctrl or A or B)
     case(Ctrl)
       \`AND: W <= A & B;
       \`OR: W <= A | B;
       \`ADD: W <= A + B;
       \`LSL: W <= A << B;
       \`LSR: W <= A >> B;
       \`SUB: W <= A - B;
       \`PassB: W <= B;
     endcase

   assign Zero = W == 0;

endmodule
\`\`\`

To test this, we need to write another verilog file that will simulate the circuit with all possible inputs. Let's call it 'alu_tb.v', and start by defining the timescale, a max string length, and the test module.

\`\`\`verilog
// alu_tb.v
\`timescale 1ns / 1ps
\`define STRLEN 256

module alu_tb;
\`\`\`

We could pretty easily just hardcode all the inputs and expected outputs, but that would be a drag. Let's use a task instead, which is kind of like a function.

\`\`\`verilog
   task test;
      input [64:0] actual, expected;
      input [\`STRLEN-1:0] name;
      inout [7:0]         passCount;

      if(actual == expected) begin
        $display("%s passed", name);
        passCount += 1;
      end else $display("%s failed: output: %x	expected: %x", name, actual, expected);
   endtask
\`\`\`

Note that we've included an \`inout\` port to count the number of tests passCount. We'll use this in another task that reports on whether all tests have passCount.

\`\`\`verilog
   task allTestsPassed;
      input [7:0] passCount;
      input [7:0] numTests;

      if(passCount == numTests)
        $display ("All tests passed");
      else
        $display("Some tests failed");
   endtask
\`\`\`

Next we need to instantiate the test module's test signals and the unit under test, in this case the ALU. Note that since we'll be running the tests in an \`initial\` block, the inputs need to be \`reg\`s.

\`\`\`verilog
   reg [63:0]     A;
   reg [63:0]     B;
   reg [3:0]      Ctrl;
   reg [7:0]      passCount;

   wire [63:0]    W;
   wire           Zero;

   // Instantiate the  Unit Under Test (UUT)
   alu uut(
	   .W(W),
	   .Zero(Zero),
	   .A(A),
	   .B(B),
	   .Ctrl(Ctrl)
	   );
\`\`\`

Now for the meat of the test bench. In an \`initial\` block, we need to initialize the test signals, then test some arbitrary operations to make sure they come out right. Finally we \`$finish\` the simulation and close the module block.

\`\`\`verilog
   initial begin
      // Initialize test signals
      A = 0;
      B = 0;
      Ctrl = 0;
      passCount = 0;

      // Test ADD
      Ctrl = 4'h2;
      {A, B} = {64'hcd, 64'hab00}; #20; test({Zero, W}, 65'h0abcd, "ADD 0xcd, 0xab", passCount);

      // Test AND
      Ctrl = 4'h0;
      {A, B} = {64'h20, 64'h20}; #20; test({Zero, W}, 65'h20, "AND 0x20,0x20", passCount);

      // ...

      allTestsPassed(passCount, 2);
      $finish;
   end

endmodule
\`\`\`

`},
{ name: "transmission-lines.md",
data: `---
layout: page
title: Wave Propagation On a Transmission Line
usemathjax: true
---
If an electrical line is long enough ($$rac{l}{\lambda}\gtrapprox{}0.01$$), the effects of the length must be taken into account. We call such lines _TEM transmission lines_{: style="color: red;"}, and they consist of two conductors separated by a dielectric material (for example, a coaxial cable).

# The Telegrapher's Equations

To try and understand the behavior of voltage and current along transmission lines, we divide one into $$n$$ two port networks of length $$\Delta{}z$$, one of which is shown below.

<p align="center">
    <img src="/tem_two_port.png" alt="Two port lumped element model"/>
    <figcaption>Figure 1. A two-port network along a transmission line.</figcaption>
</p>

The circuit parameters shown depend on the geometry of the transmission line and are defined as:
- $$R'$$ -- the distributed resistance of the line in Ohms per meter.
- $$L'$$ -- the distributed inductance of the line in Henries per meter.
- $$C'$$ -- the capacitance between the two conductors of the line in Farads per meter.
- $$G'$$ -- the conductance of the dielectric between the conductors in Siemens per meter.

These parameters depend on the geometry and the materials of the line itself. KVL around the outer loop obtains

$$
egin{align*}
v(z,t)-v(z+\Delta{}z,t)=R'\Delta{}zi(z,t)+L'\Delta{}z\pderiv{i(z,t)}{t}\
-rac{v(z+\Delta{}z,t)-v(z,t)}{\Delta{}z}=R'i(z,t)+L'\pderiv{i(z,t)}{t}
nd{align*}
$$

Letting $$n$$ grow to infinity, the equation becomes the first of the Telegrapher's Equations, describing voltage.

$$
egin{equation}
-\pderiv{v(z,t)}{z}=R'i(z,t)+L'\pderiv{i(z,t)}{t}
\label{eq:telegraphers_voltage}
nd{equation}
$$

A similar process with KCL down the shunt gives

$$
egin{align*}
i(z,t)-i(z+\Delta{}z,t)&=G'\Delta{}zv(z,t)+C'\pderiv{v(z,t)}{t}\
-rac{[i(z+\Delta{}z,t)-i(z,t)]}{\Delta{}z}&=G'v(z,t)+C'\pderiv{v(z,t)}{t}\
nd{align*}
$$

Again letting $$n$$ grow infinitely large yields the second Telegrapher's Equation, describing current.

$$
egin{equation}
-\pderiv{i(z,t)}{z}=G'v(z,t)+C'\pderiv{v(z,t)}{t}
\label{eq:telegraphers_current}
nd{equation}
$$

# Wave Propagation

One fruitful avenue of analysis is the behavior of sinusoidal steady-state voltages and currents along transmission lines. To that end, we use the phasor form of the Telegrapher's Equations.

$$
egin{equation}
-\deriv{	ilde{V}(z)}{z}=	ilde{I}(z)(R'+j\omega{}L')
\label{eq:telegraphers_voltage_phasor}
nd{equation}
$$

$$
egin{equation}
-\deriv{	ilde{I}(z)}{z}=	ilde{V}(z)(G'+j\omega{}C')
\label{eq:telegraphers_current_phasor}
nd{equation}
$$

Taking the derivative with respect to $$z$$ of both sides of Eq. (
ef{eq:telegraphers_voltage_phasor}) and substituting in Eq. (
ef{eq:telegraphers_current_phasor}) for current, we get

$$-rac{\partial{}^2	ilde{V}(z)}{\partial{}z^2}=-	ilde{V}(z)(G'+j\omega{}C')(R'+j\omega{}L')$$

A little bit of rearrangement yields a wave equation

$$
egin{equation}
rac{\partial{}^2	ilde{V}(z)}{\partial{}z^2}-\gamma^2	ilde{V}(z)=0
\label{eq:voltage_wave}
nd{equation}
$$

where $$\gamma=\sqrt{(R'+j\omega{}L')(G'+j\omega{}C')}=lpha+jeta$$ is defined as the _propagation constant_{: style="color: red;"} of the transmission line. It consists of a real part, an _attenuation constant_{: style="color: red;"} $$lpha$$, and a _phase constant_{: style="color: red;"} $$eta$$. A similar procedure obtains the corresponding current wave equation.

$$
egin{equation}
rac{\partial{}^2	ilde{I}(z)}{\partial{}z^2}-\gamma^2	ilde{I}(z)=0
\label{eq:current_wave}
nd{equation}
$$

The general solution of these equations is well known, and takes the form

$$
egin{equation}
\label{eq:voltage_general_solution}
nd{equation}
$$

$$
egin{equation}
\label{eq:current_general_solution}
nd{equation}
$$

If we return to the time domain, it is clear these solutions describe the sum of waves traveling in opposing directions, a phenomena known as a _standing wave_{: style="color: red;"}, whose forward propagating waves have amplitudes $$V_0^+$$ and $$I_0^+$$ and whose backward propagating waves have amplitudes $$V_0^-$$ and $$I_0^-$$.

# Characteristic Impedance

We now have equations that describe the behavior of voltage and current waves on a transmission line. But we still have four unknown amplitudes.

We can reduce the number of unknowns to two by relating the voltage and current amplitudes. To do this, we substitute Eq. (
ef{eq:voltage_general_solution}) into Eq. (
ef{eq:telegraphers_voltage_phasor}) and solve for $$	ilde{I}(z)$$.

$$
egin{align*}
	ilde{I}(z)&=I_0^+e^{-j\gamma}+I_0^-e^{j\gamma}\
&=rac{\gamma}{R'+j\omega{}L'}(V_0^+e^{-\gamma{}z}-V_0^-e^{\gamma{}z})\
nd{align*}
$$

Comparing the amplitudes of voltage and current, it is clear that

$$
egin{equation}
V_0^+=rac{I_0^+}{Z_0}\qquad{}V_0^-=-rac{I_0^-}{Z_0}
nd{equation}
$$

where $$Z_0$$ is defined as the _characteristic impedance_{: style="color: red;"} and given by

$$
egin{equation}
Z_0=rac{R'+j\omega{}L'}{\gamma}=\sqrt{rac{R'+j\omega{}L'}{G'+j\omega{}C'}}
\label{eq:characteristic_impedance_general}
nd{equation}
$$

We can now define Eq. (
ef{eq:current_general_solution}) in terms of the characteristic impedance.

$$
egin{equation}
\label{eq:current_solution_characteristic_impedance}
nd{equation}
$$

# The Lossless Case

A well designed transmission line uses conductors with high conductivity and dielectrics with high resistivity, making $$R'$$ and $$G'$$ very small. In the ideal case, $$R'=G'=0$$ and the line is considered "lossless". The propagation constant of such a line reduces to

$$
egin{equation}
\gamma=lpha+jeta=j\omega{}\sqrt{L'C'}
nd{equation}
$$

which implies that $$lpha=0$$ and $$eta=\omega{}\sqrt{L'C'}$$, or $$\gamma=jeta$$. Thus Eqs. (
ef{eq:voltage_general_solution}) and (
ef{eq:current_solution_characteristic_impedance}) reduce to

$$
egin{equation}
\label{eq:voltage_wave_lossless}
nd{equation}
$$

$$
egin{equation}
\label{eq:current_wave_lossless}
nd{equation}
$$

Similarly, the characteristic impedance of a lossless line is given by

$$
egin{equation}
Z_0=\sqrt{rac{L'}{C'}}
\label{eq:characteristic_impedance_lossless}
nd{equation}
$$

The fact that a wave's velocity is given by $$u_p=rac{\omega}{eta}$$ implies that, in the case of a lossless line, the phase velocity is given by

$$u_p=rac{\omega}{eta}=rac{\omega}{\omega{}\sqrt{L'C'}}=rac{1}{\sqrt{L'C'}}$$

Thus, the velocity of the wave is independent of its frequency. In this way, dispersion (where different frequencies that make up a signal travel at different speeds and therefore arrive at different times, causing distortion) is avoided.

Interestingly, the condition known as the _Heaviside Condition_{: style="color: red;"}, satisfied if $$rac{G'}{C'}=rac{R'}{L'}$$, also eliminates dispersion. Given the Heaviside Condtion,

$$
egin{align*}
\gamma&=\sqrt{(R'+j\omega{}L')(G'+j\omega{}C')}\
&=\sqrt{L'C'(rac{R'}{L'}+j\omega{})(rac{G'}{C'}+j\omega{})}\
&=\sqrt{R'G'}+j\omega{}\sqrt{L'C'}\
&=lpha+jeta\
nd{align*}
$$

Again, the velocity $$u_p=rac{\omega}{eta}$$ does not depend on frequency, and the the line is known as "distortionless".

# Reflection Coefficient

Limiting ourselves to the lossless case, we apply a boundary condition at the load in order to relate the amplitudes of the forward and backward propagating waves, also known as the _incident wave_{: style="color: red;"} and _reflected wave_{: style="color: red;"}. For convenience, we define the load to be at $$z=0$$.

<p align="center" >
    <img src="/tem_coordinate_system.png" alt="Transmission Line Coordinate System"/>
    <figcaption>Figure 2. The circuit under analysis, and the coordinate system used.</figcaption>
</p>

With this in mind, the impedance at the load is

$$Z_L=rac{	ilde{V}(0)}{	ilde{I}(0)}=Z_0rac{V_0^++V_0^-}{V_0^+-V_0^-}$$

Solving for the ratio of the amplitudes of the incident and reflected waves yields the the _voltage reflection coefficient_{: style="color: red;"} at the load, defined as

$$
egin{equation}
\Gamma_L=rac{V_0^-}{V_0^+}=rac{Z_L-Z_0}{Z_L+Z_0}
\label{eq:reflection_coefficient_load}
nd{equation}
$$

Since $$Z_L$$ is in general a complex number, $$\Gamma_L=ert{}\Gamma_Lert{}e^{j	heta_{\Gamma}}$$. If a load is _matched_{: style="color:red;"}, $$Z_L=Z_0$$ and $$\Gamma_L=0$$; there is no reflection on the line. If $$Z_L=0$$ (a short circuit), $$\Gamma=-1$$. If $$Z_L=\infty$$ (an open circuit), then $$\Gamma=1$$.

Using Eqs. (
ef{eq:voltage_wave_lossless}) and (
ef{eq:reflection_coefficient_load}), we can now define our wave equations with just one unknown, namely $$V_0^+$$.

$$
egin{equation}
\label{eq:voltage_wave_gamma}
nd{equation}
$$

$$
egin{equation}
\label{eq:current_wave_gamma}
nd{equation}
$$

# The Last Unknown

In order to solve for $$V_0^+$$, we need to apply another boundary condition, this time at the source. Taking the _wave impedance_{: style="color: red;"}, or the impedance at a point $$z$$ on the line, as the ratio of Eqs. (
ef{eq:voltage_wave_gamma}) and (
ef{eq:current_wave_gamma}), we have

$$
egin{align*}
Z(z)&=rac{	ilde{V}(z)}{	ilde{I}(z)}\
&=Z_0rac{e^{-jeta{}z}(1+\Gamma_L{}e^{j2eta{}z})}{e^{-jeta{}z}(1-\Gamma_L{}e^{j2eta{}z})}\
&=Z_0rac{1+\Gamma_z}{1-\Gamma_z}\
nd{align*}
$$

where $$\Gamma_z=\Gamma_Le^{j2eta{}z}$$, which is $$\Gamma_L$$ phase shifted by $$2eta{}z$$ toward the source. The _input impedance_{: style="color:red;"}, or the impedance of a line of length $$l$$ at $$z=-l$$, is therefore

$$Z_{in}=Z(-l)=Z_0rac{1+\Gamma_L{}e^{-j2eta{}l}}{1-\Gamma_L{}e^{-j2eta{}l}}$$

The input impedance and the source impedance (as shown in Figure 2) therefore form a voltage divider, expressed by

$$
egin{equation}
	ilde{V}(l)=rac{	ilde{V}_GZ_{in}}{Z_G+Z_{in}}
\label{eq:input_voltage}
nd{equation}
$$

The voltage at $$z=-l$$ can also be expressed through Eq. (
ef{eq:voltage_wave_gamma}), and when combined with Eq. (
ef{eq:input_voltage}), give us an expression for $$V_0^+$$.

$$
egin{equation}
V_0^+=(rac{	ilde{V}_GZ_{in}}{Z_G+Z_{in}})(rac{1}{e^{jeta{}l}+\Gamma_Le^{-jeta{}l}})
\label{eq:incident_wave_amplitude}
nd{equation}
$$

Substituting this equation into Eq. (
ef{eq:voltage_wave_gamma}) yields the final solution to the voltage and current waves along a transmission line of length $$l$$, depending only on $$l$$ and the parameters of the line $$R'$$, $$G'$$, $$L'$$, and $$C'$$.

$$
egin{equation}
\label{eq:voltage_final_solution}
nd{equation}
$$

$$
egin{equation}
\label{eq:current_final_solution}
nd{equation}
`},
{ name: "writing-a-shell-01.md",
data: `---
layout: page
title: "Writing a Shell: 01 Lexing and Parsing"
---

Let's write a shell in C++. This shell will support pipelines, file system navigation, input and output redirection, and background processes. Let's call it smash, for Student MAde SHell.

We'll start by creating a main function that does the following in a loop:
1. Prints a prompt.
2. Reads user input.
3. Prints that input.

\`\`\`c++
// smash.cpp
int main() {
    string input;

    while (true) {
        cout << "smash> ";
        getline(cin, input);
        cout << input << endl;
    }

    return 0;
}
\`\`\`

> NOTE: For brevity, many of the code examples presented are missing the \`using\` and \`#include\` statements necessary to make the code compile.

Now we're ready to parse the input into structured data.

# The Grammar

In order to make input processing as painless as possible, we should define a grammar for valid input to smash.

\`\`\`
statement ::= pipeline '&'
pipeline ::= redirection | redirection '|' pipe
redirection ::= command ('<' word) ('>' word)
command ::= word | word command
word ::= character | word character | '\'' word* '\'' word | '"' word '"' word*
character ::= (a-z | A-Z | 0-9 | [:punct:])*
\`\`\`

Everything we do is based on this grammar. Anytime we need to add or change a feature, chances are the first step will be to modify the grammar.

# Lexing

Now for the lexing stage. The idea is to take an input string and divide it into tokens of different types. The parser will accept a stream of these tokens and make decisions about how to structure them based on the grammar. Let's start by defining a \`Token\` class.

\`\`\`c++
// lex.hpp
struct Token {
    enum Type {
        eof = -1,
        amp = '&',
        bar = '|',
        gt = '>',
        lt = '<',
        newline = '
',
        word
    };

    int type;
    std::string lexeme;
    Token(int type = word, std::string lexeme = "")
        : type(type), lexeme(lexeme) {}
    std::string to_string();
};
\`\`\`

Each \`Token::Type\` represents a symbol in the grammar, and we've defined a method \`to_string()\` that can help with debugging.

For the lexing process we'll encode a [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) with a \`Lexer\` class. Here's the definition.

\`\`\`c++
class Lexer {
    std::istream &in;
    bool in_repl;

    Token to_start(char);
    Token to_comment(char);
    Token to_word(char, std::stringstream &);
    Token to_quote(char, std::stringstream &);
    Token to_eof();

  public:
    Lexer(std::istream &in, bool in_repl = true) : in(in), in_repl(in_repl) {}
    Token next_token();
    bool eof();
};
\`\`\`

Each state reacts differently to different characters, and each state transition is associated with an action. In this representation, each private method represents both the transition and the response to different inputs.

>NOTE: We pass in \`bool is_repl\` to \`Lexer\`'s constructor because later on we'll be reading files and some aspects of the lexer will work slightly differently.

The main method used by the parser will be \`next_token()\`. Each successive call to this method will return the next token in the stream, until it reaches EOF. The definition of \`next_token()\`, \`eof()\`, and each state method is shown below.

\`\`\`c++
#include "lex.hpp"

bool isop(char c) { return c == '&' || c == '|' || c == '>' || c == '<'; }
bool isspace(char c) { return c == ' ' || c == '	' || c == ''; }

Token Lexer::to_start(char c) {
    stringstream out;

    while (isspace(c)) {
        in.get();
        c = in.peek();
    }

    if (c == '#') {
        return to_comment(c);
    } else if (c == '
' || isop(c)) {
        return Token(in.get());
    } else if (c == EOF) {
        return to_eof();
    } else {
        return to_word(c, out);
    }
}

Token Lexer::to_comment(char c) {
    while ((c = in.get()) != '
') {
    }
    return Token(c);
}

Token Lexer::to_word(char c, stringstream &out) {
    while (c != '
' && !isspace(c) && !isop(c)) {
        if (c == EOF) {
            break;
        } else if (c == '\'' || c == '"') {
            return to_quote(in.get(), out);
        } else {
            out << (char)in.get();
        }
        c = in.peek();
    }

    return Token(Token::word, out.str());
}

Token Lexer::to_quote(char c, stringstream &out) {
    char delim = c;

    while ((c = in.get()) != delim) {
        if (c == EOF) {
            throw LexError("unexpected EOF, expected closing " +
                           string(1, delim));
        } else {
            out << c;
            if (c == '
' && in_repl) {
                cout << "quote> ";
            }
        }
    }

    c = in.peek();
    return to_word(c, out);
}

Token Lexer::to_eof() { return Token(Token::eof); }

Token Lexer::next_token() {
    char c = in.peek();
    return to_start(c);
}

bool Lexer::eof() { return in.eof(); }
\`\`\`

Note that \`LexError\` is just a wrapper around \`std::runtime_error\` is is defined thusly.

\`\`\`c++
// lex.hpp
struct LexError : public std::runtime_error {
    LexError(const std::string &what) : runtime_error(what) {}
};
\`\`\`

Before we get much further, it'd be nice if we had an easy way to build our project without having to type in the compiler directives every time. Let's do ourselves a favor and write a Makefile.

\`\`\`make
# Makefile
CCFLAGS := -std=c++17
EXE := smash

$(EXE): smash.cpp lex.o
	$(CXX) $(CCFLAGS) $^ -o $@

lex.o: lex.cpp lex.hpp
	$(CXX) $(CCFLAGS) -c $< -o $@

.PHONY:
clean:
	rm *.o $(EXE)
\`\`\`

Okay, looks good. Time for parsing.

# Parsing

Before we start structuring the tokens, we need to define such structures in code. One \`Directive\` class should hold all the data we need.

\`\`\`c++
// parse.hpp
struct Directive {
    bool background;
    pid_t pid;
    std::string name, infile, outfile;
    std::vector<std::string> args;
    Directive *next;

    char **argv();
    std::string full_name();
};
\`\`\`

The string \`name\` holds the actual command (e.g. 'echo' or 'ps'), and the \`args\` vector holds any arguments that follow. The strings \`infile\` and \`outfile\` are for redirection, and \`next\` points to the next command in the pipeline, if one exists. The \`argv()\` and \`full_name()\` functions will be used once we start executing the \`Directives\` in the terminal.

Similar to before, we want to overload \`operator<<\` to pretty-print the \`Command\` object. This time, though, we'll need a recursive helper function to facilitate printing the linked list.

\`\`\`c++
// parse.cpp
void ostream_helper(std::ostream &os, const Directive *directive,
                    int num_spaces, int indent_width) {
    if (directive == nullptr) {
        return;
    }

    os << string(num_spaces, ' ');
    os << "Directive {" << endl;

    os << string(num_spaces + indent_width, ' ') << "pid: " << directive->pid
       << endl;
    os << string(num_spaces + indent_width, ' ') << "name: '" << directive->name
       << "'" << endl;

    if (directive->background) {
        os << string(num_spaces + indent_width, ' ') << "background: true"
           << endl;
    }

    if (!directive->infile.empty()) {
        os << string(num_spaces + indent_width, ' ') << "infile: '"
           << directive->infile << "'" << endl;
    }

    if (!directive->outfile.empty()) {
        os << string(num_spaces + indent_width, ' ') << "outfile: '"
           << directive->outfile << "'" << endl;
    }

    os << string(num_spaces + indent_width, ' ') << "args: [";
    for (unsigned int i = 0; i < directive->args.size(); ++i) {
        os << "'" << directive->args[i] << "'";
        if (i != directive->args.size() - 1) {
            os << ", ";
        }
    }
    os << "]" << endl;

    if (directive->next) {
        os << string(num_spaces + indent_width, ' ') << "next:" << endl;
        ostream_helper(os, directive->next, num_spaces + indent_width,
                       indent_width);
    }

    os << string(num_spaces, ' ') << "}";
    if (num_spaces) {
        os << endl;
    }
}

ostream &operator<<(ostream &os, const Directive *directive) {
    ostream_helper(os, directive, 0, 4);
    return os;
}
\`\`\`

Now we need an object to store the state of the parsing process. \`Parser\` contains a \`Lexer\` and the current token in the token stream, and each private method corresponds to a grammar rule. The \`eof()\` method forwards the same method on \`Lexer\`.

\`\`\`c++
// parse.hpp
class Parser {
    Lexer lexer;

    Token current_token;

    Directive *command(bool);
    Directive *redirection(bool);
    Directive *pipeline(bool);

  public:
    Parser(Lexer &lexer) : lexer(lexer) {}
    Directive *parse();
    bool eof();
};
\`\`\`

Since the grammar is [context free](https://en.wikipedia.org/wiki/Context-free_grammar), we can pretty much directly translate it into a recursive descent parser. Let's start with \`parse()\`, which will get the ball rolling.

\`\`\`c++
// parse.cpp
Directive *Parser::parse() {
    current_token = lexer.next_token();

    Directive *directive = pipeline(false);

    if (current_token.type == Token::amp) {
        directive->background = true;
        current_token = lexer.next_token();
    }

    return directive;
}
\`\`\`

This method starts by advancing the token stream, then invoking the next highest precedence of our grammar, which is the \`pipeline\`. After that, it checks if the statement ends in an ampersand. This is the only one of our methods that doesn't have the same name as the grammar rule (\`statement\`) it's derived from. Up next is the rule for \`pipeline\`.

\`\`\`c++
// parse.cpp
Directive *Parser::pipeline(bool in_expression) {
    Directive *directive = redirection(in_expression);

    while (current_token.type == Token::bar) {
        current_token = lexer.next_token();
        directive->next = pipeline(true);
    }

    return directive;
}
\`\`\`

This one is simple. First we let the \`redirection\` rule apply, then we loop through the pipeline as long as there are '\|' tokens to consume, recursively parsing them as new pipelines. Now for redirection.

\`\`\`c++
// parse.cpp
Directive *Parser::redirection(bool in_expression) {
    Directive *directive = command(in_expression);

    if (current_token.type == Token::lt) {
        current_token = lexer.next_token();

        if (current_token.type != Token::word) {
            throw ParseError("unexpected token " + current_token.to_string());
        }

        directive->infile = current_token.lexeme;

        current_token = lexer.next_token();
    }

    if (current_token.type == Token::gt) {
        current_token = lexer.next_token();

        if (current_token.type != Token::word) {
            throw ParseError("unexpected token " + current_token.to_string());
        }

        directive->outfile = current_token.lexeme;

        current_token = lexer.next_token();
    }

    return directive;
}
\`\`\`

> NOTE: \`ParseError\` is almost exactly the same as \`LexError\`.

Like before, it's pretty much a direct translation from the grammar. We first check if there is a '<' to consume, then do the same for the '>' token. Finally, here's the method that corresponds to \`command\`.

\`\`\`c++
// parse.cpp
Directive *Parser::command() {
    if ((current_token.type == Token::newline && !in_pipeline) ||
        current_token.type == Token::eof) {
        return nullptr;
    } else if (current_token.type == Token::newline && in_pipeline) {
        if (lexer.in_repl()) {
            cout << "pipe> ";
        }
        current_token = lexer.next_token();
    }

    if (current_token.type != Token::word) {
        throw ParseError("unexpected token " + current_token.to_string());
    }

    Directive *directive = new Directive();
    directive->name = current_token.lexeme;

    current_token = lexer.next_token();
    while (current_token.type == Token::word) {
        directive->args.push_back(current_token.lexeme);
        current_token = lexer.next_token();
    }

    return directive;
}
\`\`\`

> NOTE: We ignore any newline or eof token detected if the user is not in the middle of writing an expression (or EOF has been reached). Also, similar to the Lexer, if we're in a repl we print a special prompt if the user keys in a newline in the middle of a pipeline.

We also forward the \`Lexer::eof()\` method to the parser so that it knows when it's not possible to keep going.

\`\`\`c++
// parser.cpp
bool Parser::eof() { return lexer.eof(); }
\`\`\`

Now let's instantiate a \`Lexer\` and a \`Parser\` in the main program...

\`\`\`c++
// smash.cpp
int main() {
    string input;
    Directive *directive;
    Lexer lexer(cin, true);

    while (true) {
        cout << "smash> ";

        try {
            cout << "smash> ";

            directive = Parser(lexer).parse();

            if (directive) {
                cout << directive << endl;
            }

        } catch (LexError &err) {
            cerr << "Lex error: " << err.what() << endl;
        } catch (ParseError &err) {
            cerr << "Parse error: " << err.what() << endl;
        }
    }

    return 0;
}
\`\`\`

...modify our makefile to include the new parsing module...

\`\`\`make
# Makefile
$(EXE): smash.cpp lex.o parse.o shell.o
	$(CXX) $(CCFLAGS) $^ -o $@

parse.o: parse.cpp parse.hpp
	$(CXX) $(CCFLAGS) -c $< -o $@
\`\`\`

...and try it out!

\`\`\`
❯ ./smash
smash> echo hello &
Directive {
    pid: 0
    name: 'echo'
    background: true
    args: ['hello']
}
smash> cat < in > out
Directive {
    pid: 0
    name: 'cat'
    infile: 'in'
    outfile: 'out'
    args: []
}
smash> echo 'hello
quote> world' |
pipe> grep 'hello' |
pipe> grep 'lo'
Directive {
    pid: 0
    name: 'echo'
    args: ['hello
world']
    next:
    Directive {
        pid: 0
        name: 'grep'
        args: ['hello']
        next:
        Directive {
            pid: 0
            name: 'grep'
            args: ['lo']
        }
    }
}
ajbond /home/ajbond/Documents/smash>
\`\`\`
`},
{ name: "writing-a-shell-02.md",
data: `---
layout: page
title: "Writing a Shell: 02 Built In Commands and Input Files"
---

# Changing Directories

Let's start the execution phase by implementing changing directories. Shells usually execute commands by spawning a child process, executing the command, then returning to the shell process. Commands \`cd\` can't work like that because if it executed a change of directory in the child process, the parent process wouldn't see it and you'd still be in the same directory. Luckily there's \`chdir()\`, which will do nicely.

First, we need to identify whether a command is a directive like \`cd\`. Then, we can write a function to execute those functions specially.

\`\`\`c++
// exec.cpp
void exec(Directive *directive) {
    if (directive->name == "cd") {
        exec_cd(directive);
    }
}
\`\`\`

Before we implement \`cd\`, let's create a global struct that'll hold some shell environment variables.

\`\`\`c++
// exec.hpp
extern struct shell {
    std::string USER;
    std::string HOME;
    std::string OLDPWD;
} shell;
\`\`\`

We've declared the struct, but we still need to initialize it. Let's do that near our main function, using \`getpwuid()\` to get the user's name and home directory. Let's also display the user name and current directory in the prompt.

\`\`\`c++
// smash.cpp
struct shell shell;

void init() {
    struct passwd *pw;
    pw = getpwuid(getuid());
    shell.USER = string(pw->pw_name);
    shell.HOME = string(pw->pw_dir);
}

std::string prompt() {
    stringstream ss;
    ss << shell.USER << " " << filesystem::current_path().string() << "> ";
    return ss.str();
}
\`\`\`

Okay, back to \`cd\`. If there are no arguments, we should change to the user's home directory. If the argument is "-" we should change to the previous directory (if there is one). Otherwise, we should try to change to the path supplied by the user. System calls like \`chdir\` use a global number \`errno\` to report any errors; we'll handle some of the more common ones.

\`\`\`c++
// exec.cpp
void exec_cd(Directive *directive) {
    string arg, oldpwd = string(std::filesystem::current_path());

    if (directive->args.empty()) {
        arg = shell.HOME;
    } else if (directive->args[0] == "-") {
        if (!shell.OLDPWD.empty()) {
            arg = shell.OLDPWD;
        }
    } else {
        arg = directive->args[0];
    }

    if (chdir(arg.c_str()) == -1) {
        switch (errno) {
        case EACCES:
            throw ShellError("cd: permission denied");
        case EFAULT:
        case ENAMETOOLONG:
            throw ShellError("cd: name too long");
        case ENOENT:
            throw ShellError("cd: " + arg + " does not exist");
        default:
            throw ShellError("cd: an unknown error has occurred (errno = " +
                             to_string(errno) + ")");
        }
    }

    shell.OLDPWD = oldpwd;
}
\`\`\`

# A Smooth Exit

Up until now we've had to hit 'Ctrl C' to exit smash. Let's fix that. The \`exit\` directive is also built in, so we can chck for it in \`exec()\`.

\`\`\`c++
// exec.cpp
void exec(Directive *directive) {
    if (directive->name == "cd") {
        exec_cd(directive);
    } else if (directive->name == "exit") {
        exec_exit(directive);
    }
}
\`\`\`

The implementation of \`exit\` is a lot simpler than \`cd\`. It can optionally take an exit code as an argument, so we'll check for that first. Then, we'll throw an exception to get back to the main program.

\`\`\`c++
// exec.cpp
void exec_exit(Directive *directive) {
    int status = 0;

    if (!directive->args.empty()) {
        try {
            status = stoi(directive->args[0]);
        } catch (std::invalid_argument &err) {
        }
    }

    delete directive;

    throw Exit(status);
}
\`\`\`

> NOTE: I think some might frown at using an exception for control flow here. But I think it's a clean, easily understandable way to do it.

The \`Exit\` struct is, as you'd imagine, a struct wrapping an integer.

\`\`\`c++
// exec.hpp
struct Exit {
    int status;
    Exit(int status) : status(status) {}
};
\`\`\`

And in our main program, we'll track a status integer and catch \`Exit\` when it's thrown.

\`\`\`
// smash.cpp
int main() {
    int status = 0;
    string input;
    Directive *directive;
    Lexer lexer(cin, true);

    while (true) {
        cout << "smash> ";

        try {
            cout << "smash> ";

            directive = Parser(lexer).parse();

            if (directive) {
                cout << directive << endl;
            }

        } catch (LexError &err) {
            cerr << "Lex error: " << err.what() << endl;
        } catch (ParseError &err) {
            cerr << "Parse error: " << err.what() << endl;
        } catch (Exit &err) {
            status = err.status;
            break;
        }
    }

    return status;
}
\`\`\`

As usual, now that we've coded it up, let's try it out!

\`\`\`
❯ ./smash
ajbond /home/ajbond/Documents/smash> cd
ajbond /home/ajbond> cd -
ajbond /home/ajbond/Documents/smash> cd ..
ajbond /home/ajbond/Documents> cd smash
ajbond /home/ajbond/Documents/smash> exit
❯
\`\`\`

# Reading an Input File

By choosing to pass a generic \`istream\` object to the lexer and parser, we should be able to read a file in the same way we do text from the terminal. First, let's rework our main function to handle files.

\`\`\`c++
// smash.cpp
int main(int argc, char **argv) {
    init();

    try {
        if (argc == 1) {
            repl();
        } else {
            readfile(argv[1]);
        }
    } catch (ShellError &err) {
        cerr << "Shell error: " << err.what() << endl;
    } catch (Exit &err) {
        return err.status;
    }

    return 0;
}
\`\`\`

Now we need to implement \`repl()\` and \`readfile()\`. The former is just moving what we had before into its own function.

\`\`\`c++
// smash.cpp
void repl() {
    string input;
    Directive *directive;
    Lexer lexer(cin, true);

    while (true) {
        try {
            cout << prompt();
            directive = Parser(lexer).parse();
            if (directive) {
                cout << directive << endl;
            }
            reap_jobs();
        } catch (LexError &err) {
            cerr << "Lex error: " << err.what() << endl;
        } catch (ParseError &err) {
            cerr << "Parse error: " << err.what() << endl;
        } catch (ShellError &err) {
            cerr << "Shell error: " << err.what() << endl;
        }
    }
}
\`\`\`

The \`readfile()\` function is similar, but it consumes tokens from the file until EOF is reached.

\`\`\`c++
// smash.cpp
void readfile(string filename) {
    ifstream infile(filename);
    if (!infile.is_open()) {
        throw ShellError("unable to open file " + filename);
    }

    Directive *directive;
    Lexer lexer(infile, false);
    Parser parser(lexer);

    try {
        while (!parser.eof()) {
            directive = parser.parse();
            if (directive) {
                cout << directive << endl;
            }
            reap_jobs();
        }
    } catch (LexError &err) {
        cerr << "Lex error: " << err.what() << endl;
    } catch (ParseError &err) {
        cerr << "Parse error: " << err.what() << endl;
    } catch (ShellError &err) {
        cerr << "Shell error: " << err.what() << endl;
    }
}
\`\`\`

Let's craft a test file and make sure things are working as they should.

\`\`\`
# test.smash
echo hello &
cat < in > out
echo 'hello
world' |
grep 'hello' |
grep 'lo'
\`\`\`

\`\`\`
❯ ./smash test.smash
Directive {
    pid: 0
    name: 'echo'
    background: true
    args: ['hello']
}
Directive {
    pid: 0
    name: 'cat'
    infile: 'in'
    outfile: 'out'
    args: []
}
Directive {
    pid: 0
    name: 'echo'
    args: ['hello
world']
    next:
    Directive {
        pid: 0
        name: 'grep'
        args: ['hello']
        next:
        Directive {
            pid: 0
            name: 'grep'
            args: ['lo']
        }
    }
}
❯
`},
{ name: "writing-a-shell-03.md",
data: `---
layout: page
title: "Writing a Shell: 03 Executing Commands"
---

This chapter is where we finally get to the interesting part of the shell -- executing commands.

# Fork and Exec

For smash to run commands, it needs the ability to create new processes. In Unix, this is accomplished with \`fork()\`, which creates a duplicate of the current process, and the \`exec\` family of functions, which overwrite the process that invokes it with a new one.

We'll start by just executing a single directive (i.e., no pipelines). To do this, we'll call fork and then \`execvp\`. Each function in the  \`exec\` family of functions has attributes. The 'v' in \`execvp\` denotes that the function takes a null terminated array of \`char *\` for its second argument, and the 'p' signifies that the path will be searched for the command provided as the first argument.

Since we need a null terminated array of \`char *\`, and the \`args\` field of a \`Directive\` is of type \`vector<string>\`, we need a way to convert the two. Each c++ \`string\` contains a pointer to the underlying \`char *\` array, so copying each of these pointers to a new array should do the trick. What's more, the \`exec\` functions clean up any memory used in their invocation, so we needn't worry about leaks.

Let's add a function to do just that, first in the header...

\`\`\`c++
struct Directive {
    bool background;
    pid_t pid;
    std::string name, infile, outfile;
    std::vector<std::string> args;
    Directive *next;

    char **argv();
};
\`\`\`

...and then the implementation file.

\`\`\`c++
// parse.cpp
char **Directive::argv() {
    int argc = args.size() + 2;
    char **argv = new char *[argc];

    argv[0] = (char *)name.c_str();
    for (int i = 0; i < argc - 2; ++i) {
        argv[i + 1] = (char *)args[i].c_str();
    }
    argv[argc - 1] = nullptr;

    return argv;
}
\`\`\`

Now let's invoke \`fork()\` and \`execvp()\`. The \`fork()\` function returns the pid of the child process in the parent, 0 in the child, and -1 if an error has occurred. The \`execvp()\` function should not return anything (it's overwriting the current process, aftera all), and if it does we know there's been an error. Finally, as the parent process, we need to \`wait()\` on the child process, telling the operating system that the process can be safely removed from its list of running processes. We can also take this chance to free up the \`Directive\`'s memory.

\`\`\`c++
// exec.cpp
void exec(Directive *directive) {
    if (!directive) {
        return;
    }

    if (directive->name == "cd") {
        exec_cd(directive);
    } else if (directive->name == "exit") {
        exec_exit(directive);
    } else {
        // Fork the current process.
        if ((directive->pid = fork()) == -1) {
            throw ShellError("fork: an unknown error has occurred (errno = " +
                             to_string(errno) + ")");
        }

        // If we're in the child process...
        if (directive->pid == 0) {
            char **argv = ptr->argv();

            // Pass the name of the command to exec, and the null terminated
            // argument array (including the name of the command) to the new process.
            if (execvp(argv[0], argv)) {
                switch (errno) {
                case EACCES:
                    throw ProcessError(ptr->name + ": permission denied");
                case ENOENT:
                    throw ProcessError(ptr->name +
                                       ": no such file or directory");
                case ENAMETOOLONG:
                    throw ProcessError(ptr->name + ": pathname is too long");
                default:
                    throw ProcessError(
                        "exec: an unknown error has occurred (errno = " +
                        to_string(errno) + ")");
                }
            }
        }

        // Wait until the child process is finished and have the os reap it.
        if (waitpid(directive->pid, NULL, 0) == -1) {
            ShellError("waitpid: an unknown error has occurred (errno = " +
                        to_string(errno) + ")");
        }
        delete directive;
    }
}
\`\`\`

We can now exec our directives in in \`repl()\` and \`readfile()\` instead of just printing them.

\`\`\`c++
void repl() {
    string input;
    Directive *directive;
    Lexer lexer(cin);

    while (!lexer.eof()) {
        try {
            cout << prompt();
            directive = Parser(lexer).parse();
            exec(directive);
        } catch (LexError &err) {
            cerr << "Lex error: " << err.what() << endl;
        } catch (ParseError &err) {
            cerr << "Parse error: " << err.what() << endl;
        } catch (ShellError &err) {
            cerr << "Shell error: " << err.what() << endl;
        }
    }
}

void readfile(string filename) {
    ifstream infile(filename);
    if (!infile.is_open()) {
        throw ShellError("unable to open file " + filename);
    }

    Directive *directive;
    Lexer lexer(infile, false);
    Parser parser(lexer);

    try {
        while (!parser.eof()) {
            directive = parser.parse();
            exec(directive);
        }
    } catch (LexError &err) {
        cerr << "Lex error: " << err.what() << endl;
    } catch (ParseError &err) {
        cerr << "Parse error: " << err.what() << endl;
    } catch (ShellError &err) {
        cerr << "Shell error: " << err.what() << endl;
    }
}
\`\`\`

# Background Processes

Now that we have the basics set up, supporting background processes is as easy as not waiting on the child process to finish. Instead, we'll add it to a global jobs vector that we'll periodically check for finished processes. Let's declare the vector first.

\`\`\`c++
// exec.hpp
extern std::vector<Directive *> jobs;
\`\`\`

If the process is a background process, we'll add it to the vector instead of waiting on it and notify the user by printing its pid to stdout.

\`\`\`c++
// exec.cpp
    if (directive->background) {
        jobs.push_back(directive);
        cout << "[" << jobs.size() << "]"
             << " " << directive->pid << endl;
    } else {
        if (waitpid(directive->pid, NULL, 0) == -1) {
            ShellError("waitpid: an unknown error has occurred (errno = " +
                        to_string(errno) + ")");
        }
        delete directive;
    }
\`\`\`

Finally, we need to periodically check this vector for finished processes. For now, we'll do this in every loop in the case of repl and once after interpreting a file.

\`\`\`c++
// smash.cpp
vector<Directive *> jobs;

void repl() {
    string input;
    Directive *directive;
    Lexer lexer(cin);

    while (!lexer.eof()) {
        try {
            cout << prompt();
            directive = Parser(lexer).parse();
            exec(directive);
            reap_jobs();
        } catch (LexError &err) {
            cerr << "Lex error: " << err.what() << endl;
        } catch (ParseError &err) {
            cerr << "Parse error: " << err.what() << endl;
        } catch (ShellError &err) {
            cerr << "Shell error: " << err.what() << endl;
        }
    }
}

void readfile(string filename) {
    ifstream infile(filename);
    if (!infile.is_open()) {
        throw ShellError("unable to open file " + filename);
    }

    Directive *directive;
    Lexer lexer(infile, false);
    Parser parser(lexer);

    try {
        while (!parser.eof()) {
            directive = parser.parse();
            exec(directive);
            reap_jobs();
        }
    } catch (LexError &err) {
        cerr << "Lex error: " << err.what() << endl;
    } catch (ParseError &err) {
        cerr << "Parse error: " << err.what() << endl;
    } catch (ShellError &err) {
        cerr << "Shell error: " << err.what() << endl;
    }
}
\`\`\`

As seen already, \`waitpid()\` blocks while waiting on a process. To avoid this behavior, we can pass it the \`WNOHANG\` option. This way, \`waitpid()\` returns 0 immediately if the processes isn't finished, leaving our background processes free to finish in their own time and a user to continue executing commands.

\`\`\`c++
// smash.cpp
void reap_jobs() {
    int status;
    Directive *directive;

    for (unsigned int i = 0; i < jobs.size(); ++i) {
        directive = jobs[i];

        if ((status = waitpid(directive->pid, nullptr, WNOHANG))) {
            if (status == -1) {
                throw ShellError(
                    "waitpid: an unknown error has occurred (errno = " +
                    to_string(errno) + ")");
            }

            cout << "[" << i + 1 << "] " << directive->pid << " done	"
                  << directive->full_name() << endl;
            delete directive;
            jobs.erase(jobs.begin() + i);
        }
    }
}
\`\`\`

Now we really do have a basic shell on our hands.

\`\`\`
❯ ./smash
ajbond /Users/ajbond/Documents/smash> echo hello
hello
ajbond /Users/ajbond/Documents/smash> ls
Makefile        exec.hpp        hello           lex.hpp         parse.cpp       parse.o         smash.cpp       test.sh
exec.cpp        exec.o          lex.cpp         lex.o           parse.hpp       smash           smash.dSYM
ajbond /Users/ajbond/Documents/smash> rm test.sh
ajbond /Users/ajbond/Documents/smash> sleep 5 &
[1] 12103
ajbond /Users/ajbond/Documents/❯ ./smash
ajbond /Users/ajbond/Documents/smash> echo hello
hello
ajbond /Users/ajbond/Documents/smash> ls
Makefile        exec.hpp        hello           lex.hpp         parse.cpp       parse.o         smash.cpp       test.sh
exec.cpp        exec.o          lex.cpp         lex.o           parse.hpp       smash           smash.dSYM
ajbond /Users/ajbond/Documents/smash> rm test.sh
ajbond /Users/ajbond/Documents/smash> sleep 5 &
[1] 12103
ajbond /Users/ajbond/Documents/smash>
[1] 12103 done  sleep 5
ajbond /Users/ajbond/Documents/smash>
`},
]},
{ name: "about.md",
data: `---
layout: home
title: About
permalink: /about/
---

<img src="/headshot2.png" alt="That's me." class="img-round img-large"/>

Welcome! I’m Andrew Bond, an electrical engineering student seeking to leverage my skills in analog and digital circuits, programming, and problem solving to learn what it really means to be an electrical engineer. I'm an outstanding student with a 4.0 GPA, have strong written and interpersonal communication skills, and thrive in a team setting.

`},
{ name: "index.md",
data: `---
layout: jsh
---

<html>
<head>
<title>Andy Bond</title>
</head>
<body>
<link rel="stylesheet" href="{{ "/assets/main.css" | relative_url }}">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/src/main.css">

<div id="jshContainer">
    <textarea id="jshTextArea" name="jsh">
    </textarea>
    <canvas id="snakeCanvas">
    Sorry, your browser does not support HTML canvas.
    </canvas>
</div>

<script src="src/filesystem.js" type="text/javascript"></script>
<script src="src/shell.js" type="text/javascript"></script>
<script src="src/snake.js" type="text/javascript"></script>
</body>
</html>
`},
{ name: "notes.md",
data: `---
layout: page
title: Notes
permalink: /notes/
---
<div class="home">
  {%- if site.notes.size > 0 -%}
    <ul class="collection-list">
      {%- for note in site.notes -%}
      <li>
        <a class="collection-link" href="{{ note.url | relative_url }}">
          {{ note.title | escape }}
        </a>
      </li>
      {%- endfor -%}
    </ul>

  {%- endif -%}
</div>
`},
{ name: "portfolio.md",
data: `---
layout: page
title: Portfolio
permalink: /portfolio/
---

<div class="item" markdown="1">
[AggieSat 6](https://aggiesat.tamu.edu):
We're participating in the University NanoSatellite Program and aiming to launch our RF payload into space sometime in 2022. I'm on the EPS (Electrical Power System) team, designing circuits that will help power our satellite throughout its mission.
</div>

<div class="item" markdown="1">
<a href="/programming_assignment.pdf" download>Probability Simulation</a>
As an extra-credit project in Random Signals and Systems, I developed a simulation in Python of a random experiment involving multiple Poisson and exponential random variables. After using the simulation to predict the mean and variance of the scenario, I proved it using the laws of probability. Use the link above to download the report.
</div>

<div class="item" markdown="1">
[Passman](https://github.com/olishmollie/passman)
I was trying to find a good terminal-based password manager, but the ones I found had steep learning curves and were slow. So I wrote my own, and I still use it. It's faster than <a href="https://www.passwordstore.org">Pass</a>, and has a better installation and setup experience.
</div>

<div class="item" markdown="1">
[Lc3-as](https://github.com/olishmollie/lc3-as)
I found a great <a href="https://justinmeiners.github.io/lc3-vm/">tutorial</a> on writing your own VM that modeled the <a href="https://en.wikipedia.org/wiki/Little_Computer_3">LC-3</a>. I followed it eagerly, and after it was done I decided to build an assembler for it. I learned a lot, especially about trap routines, assembly language, and, well, assemblers. Still working on the linker and C compiler.
</div>

<div class="item" markdown="1">
[Orng](https://github.com/olishmollie/orng)
I was looking for a project to do in C++, and when I saw Rob Pike's <a href="https://github.com/robpike/ivy">Ivy</a>, I knew I had found one. It was also a great introduction to APL.
</div>

<div class="item" markdown="1">
[Fig](https://github.com/olishmollie/fig):
The token Scheme implementation. I'm proud of this one because it's in C99 and I implemented a tracing garbage collector for it. I love the name, too. I wrote a Go port of it called GoFig. Yessssssss.
</div>
`},
{ name: "terminal.md",
data: `---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
---
<link rel="stylesheet" href="{{ "/assets/main.css" | relative_url }}">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/src/main.css">

<div id="jshContainer">
    <textarea id="jshTextArea" name="jsh">
    </textarea>
    <canvas id="snakeCanvas">
    Sorry, your browser does not support HTML canvas.
    </canvas>
</div>

<script src="src/filesystem.js" type="text/javascript"></script>
<script src="src/shell.js" type="text/javascript"></script>
`},
{ name: "src",
parent: "~",
files: [
{ name: "generate_filesystem.sh",
data: `#! /usr/bin/env sh

## Outputs the contents of certain files into a JSON 'filesystem' so users
## can read source files in the JavaScript 'shell'.

mkdir notes
cp _notes/*.md notes/

outfile='src/filesystem.js'

gen() {
	for file in $1; do
		if [ -d "$file" ]; then
			{
				echo "{ name: \"$file\","
				echo "parent: \"$(dirname "$file")\"," | sed 's/\./~/'
				echo "files: ["
				gen "$file/*"
				echo "]},";
			}
		else
			if [ "$file" != "$outfile" ]; then
				echo "{ name: \"$(basename "$file")\","
				printf 'data: \`'
				while IFS= read -r line; do
					echo "$line" | sed 's/\`/\\\`/g'
				done < "$file"
				echo '\`},'
			fi
		fi
	done
}

{
	echo 'var fs = ['
	echo '{ name: "~", files: ['
	gen "notes"
	gen "*.md"
	gen "src"
	printf ']}];'
} > $outfile

if command -v prettier > /dev/null; then
	prettier -w $outfile
fi

rm -rf notes
`},
{ name: "main.css",
data: `* {
    box-sizing: border-box;
}

#jshContainer {
    width: 100vw;
    height: 100vh;
    background: #000000;
    color: lightgreen;
    border: 5px solid gray;
    display: flex;
}

#jshTextArea {
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    margin: 0;
    background: inherit;
    color: inherit;
    font-size: 20px;
    font-family: "Source Code Pro", monospace;
    border: none;
}

#snakeCanvas {
    display: none;
    background: inherit;
    color: inherit;
    border: 1px solid gray;
    margin: auto;
    justify-content: center;
    align-items: center;
}

.item {
    margin-bottom: 25px;
}

.item img {
    float: right;
}

.img-round {
    border-radius: 50%;
    margin-right: 50px;
}

.img-large {
    width: 150px;
}

.img-medium {
    width: 125px;
}

.img-small {
    width: 100px;
}

.img-xsmall {
    width: 75px;
}
`},
{ name: "shell.js",
data: `var jshContainer = document.querySelector("#jshContainer");
var jshTextArea = document.querySelector("#jshTextArea");
var snakeCanvas = document.querySelector("#snakeCanvas");
var pwd = "~";
var inputBuffer = "";
var cursorPos = beginningOfLine();

// Disable focusing away from textarea
document.addEventListener("click", function (e) {
    jshTextArea.focus();
});

// Always restore cursor position even if you click
jshTextArea.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.selectionStart = this.selectionEnd = cursorPos;
});

// Insert text into buffer
jshTextArea.addEventListener("input", function (e) {
    inputBuffer = this.value.substr(beginningOfLine());
});

function handleKeydown(e) {
    // Handle newline
    if (e.keyCode === 13) {
        e.preventDefault();
        cursorPos = beginningOfLine();
        exec(inputBuffer);
    }
    // Handle C-c
    else if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        this.value += "
$ ";
        cursorPos = beginningOfLine();
    }
    // Handle C-l (clear screen)
    else if (e.ctrlKey && e.keyCode === 76) {
        clear();
    }
    // Handle delete and backspace
    else if (e.keyCode === 8 || e.keyCode === 46) {
        if (atBeginningOfLine()) {
            e.preventDefault();
        } else {
            --cursorPos;
        }
    }
    // Disable tab (for now, will do completion eventually)
    else if (e.keyCode === 9) {
        e.preventDefault();
    }
    // Disable C-p and C-n (line movement)
    else if (e.ctrlKey && (e.keyCode === 78 || e.keyCode === 80)) {
        e.preventDefault();
    }
    // C-a: Move to beginning of input
    else if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        cursorPos = this.selectionStart = this.selectionEnd = beginningOfLine();
    }
    // C-b: Move backward
    else if (e.ctrlKey && e.keyCode === 66) {
        if (atBeginningOfLine()) {
            e.preventDefault();
        } else {
            --cursorPos;
        }
    }
    // Handle arrow keys
    else if (e.keyCode >= 37 && e.keyCode <= 40) {
        switch (e.keyCode) {
            case 37:
                if (atBeginningOfLine()) {
                    e.preventDefault();
                }
                break;
            case 38:
            case 40:
                e.preventDefault();
        }
    }
    // All other keys
    else {
        cursorPos = this.selectionStart + 1;
    }
}

function prompt() {
    return pwd + " $ ";
}

function currentLine() {
    return (jshTextArea.value.match(/
/g) || []).length;
}

function beginningOfLine() {
    let pos;
    if ((pos = jshTextArea.value.lastIndexOf("
")) === -1) {
        return prompt().length;
    }
    return pos + prompt().length + 1;
}

function atBeginningOfLine() {
    return (
        jshTextArea.selectionStart <= 2 ||
        jshTextArea.selectionStart <= beginningOfLine()
    );
}

function output(str) {
    if (str.length > 0) {
        jshTextArea.value += "
" + str + "
" + prompt();
        inputBuffer = "";
    } else {
        jshTextArea.value += "
" + prompt();
    }
    jshTextArea.scrollTop = jshTextArea.scrollHeight;
    cursorPos = jshTextArea.selectionStart;
}

var validCommands = [
    "cat",
    "cd",
    "clear",
    "exit",
    "help",
    "ls",
    "open",
    "snake",
    "resume",
];

function exec(input) {
    if (input.length === 0) {
        output("");
    } else {
        let tokens = input.split(/\s/).filter(function (str) {
            return !!str;
        });

        let command = tokens[0];

        if (validCommands.includes(command)) {
            if (command === "cat") {
                cat(tokens.slice(1));
            } else if (command === "clear") {
                clear();
            } else if (command === "cd") {
                cd(tokens.slice(1));
            } else if (command === "exit") {
                window.location.href = "/about";
            } else if (command === "help") {
                help();
            } else if (command === "ls") {
                ls(tokens.slice(1));
            } else if (command === "open") {
                open(tokens.slice(1));
            } else if (command === "snake") {
                showSnake();
                game.play();
            } else if (command === "resume") {
                window.location.href = "/Andy_Bond.pdf";
                // showResume();
            }
        } else {
            output("command not found: " + command);
        }
    }
}

function showResume() {
   window.open("Andy_Bond.pdf", '_blank').focus(); 
}

function findFile(filename, dir = fs) {
    if (!dir || !filename) {
        return false;
    }

    let path = filename.split("/");
    let obj;

    for (let i = 0; i < dir.length; ++i) {
        if (dir[i].name === filename) {
            return dir[i];
        }

        if ((obj = findFile(path.slice(1).join("/"), dir[i].files))) {
            return obj;
        }
    }

    return false;
}

function cat(args) {
    if (args.length === 0) {
        output("");
    } else {
        let entity = findFile(pwd + "/" + args[0]);
        if (entity.data) {
            output(entity.data);
        } else {
            output("cat: " + args[0] + " is a directory");
        }
    }
}

function cd(args) {
    if (args.length === 0) {
        pwd = "~";
        output("");
    } else if (args[0] === "..") {
        let parent = findFile(pwd).parent;
        pwd = parent;
        output("");
    } else {
        let path = findFile(pwd + "/" + args[0]);
        if (path && path.parent) {
            pwd += "/" + path.name;
            output("");
        } else if (!path.parent) {
            output("cd: " + args[0] + " is not a directory ");
        } else {
            output("cd: no such file or directory " + args[0]);
        }
    }
}

function clear() {
    jshTextArea.value = prompt();
    cursorPos = prompt().length;
    inputBuffer = "";
}

function help() {
    let commandStr = "[" + validCommands.join(", ") + "]";
    var helpStr = \`Commands: [\${validCommands.join(", ")}]

\`;

    helpStr += \`cat - Output a file to the terminal.
cd - Change directories.
clear - Clear the terminal screen.
exit - View the rest of the site.
help - Print this message.
ls - List files in a directory.
open - Jump to a page in the site.
snake - Arrow keys to move, 'q' to quit.
\`;
    output(helpStr);
}

function ls(args) {
    let str = "";
    let files, entity;

    if (args.length > 0) {
        entity = findFile(pwd + "/" + args[0], fs);
    } else {
        entity = findFile(pwd, fs);
    }

    if (!entity) {
        output("ls: no such file or directory " + args[0]);
        return;
    }

    if (entity.data) {
        // It's a file.
        files = [args[0]];
    } else {
        files = entity.files;
    }

    for (let i = 0; i < files.length; ++i) {
        str += files[i].name || files[i];
        if (i != files.length - 1) {
            str += " ";
        }
    }

    output(str);
}

function open(args) {
    if (args.length === 0) {
        output("open: must be provided an argument");
    } else {
        let entity = findFile(pwd + "/" + args[0]);

        if (entity && entity.data && entity.name.includes(".md")) {
            clear();
            let url;
            if (pwd != "~") {
                url = pwd.replace("~", "") + "/" + args[0].replace(".md", "");
            } else {
                url = args[0].replace(".md", "");
            }
            window.location.href = url;
        } else if (entity && entity.data) {
            output(
                "open: can only open files with '.md' extension. try \`cat\` to view source code."
            );
        } else if (entity && !entity.data) {
            output("open: " + args[0] + " is a directory");
        } else {
            output("open: no such file or directory " + args[0]);
        }
    }
}

function showSnake() {
    clear();
    snakeCanvas.style.display = "block";
    jshTextArea.style.display = "none";
}

function hideSnake() {
    snakeCanvas.style.display = "none";
    jshTextArea.style.display = "block";
}

var welcomeStr =
    "Welcome! I'm Andy Bond, an embedded software engineer.

Type 'help' for available commands, 'resume' to view my resume, or 'snake' to waste some time."

var introInterval;

function init() {
    jshTextArea.removeEventListener("keydown", disableKeyboard);
    jshTextArea.addEventListener("keydown", handleKeydown);
}

function disableKeyboard(e) {
    e.preventDefault();
    e.stopPropagation();
    clear();
    clearInterval(introInterval);
    output(welcomeStr);
    init();
}

snakeCanvas.width = "800";
snakeCanvas.height = "500";

window.onload = function () {
    game = new Game(snakeCanvas);

    jshTextArea.focus();
    jshTextArea.spellcheck = false;
    jshTextArea.textContent = prompt();
    jshTextArea.selectionStart = prompt().length;

    jshTextArea.addEventListener("keydown", disableKeyboard);

    let i = 0;
    introInterval = setInterval(function () {
        if (welcomeStr[i]) {
            jshTextArea.value += welcomeStr[i++];
            cursorPos += 1;
        } else {
            clearInterval(introInterval);
            init();
            output("");
        }
    }, 15);
};
`},
{ name: "snake.js",
data: `Number.prototype.times = function (f) {
    for (var i = 0; i < this; i++) {
        f();
    }
    return this;
};

Number.prototype.between = function (a, b) {
    var min = Math.min(a, b);
    var max = Math.max(a, b);

    return this > min && this < max;
};

class Segment {
    constructor(x, y, ctx, color = "lightgreen") {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.height = 10;
        this.width = 10;
        this.currAxis;
        this.color = color;
    }

    chase() {
        this.moveTo(this.targetX, this.targetY);
    }

    moveTo(newX, newY) {
        this.clear();
        this.draw(newX, newY);
        this.x = newX;
        this.y = newY;
    }

    draw(x, y) {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(x, y, this.height, this.width);
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.height, this.width);
    }
}

class Head extends Segment {
    constructor(x, y, ctx) {
        super(x, y, ctx);
        this.direction;
        this.draw(x, y);
    }

    draw(x, y) {
        super.draw(x, y);
        var head = this;
        function drawLeftEye() {
            head.ctx.clearRect(x + 2, y + 2, 2, 2);
        }
        function drawRightEye() {
            head.ctx.clearRect(x + 6, y + 2, 2, 2);
        }
        function drawBottomEyes() {
            head.ctx.clearRect(x + 2, y + 6, 2, 2);
            head.ctx.clearRect(x + 6, y + 6, 2, 2);
        }
        switch (this.currAxis) {
            case "+x":
                drawRightEye();
                break;
            case "-x":
                drawLeftEye();
                break;
            case "+y":
                drawBottomEyes();
                break;
            default:
                drawRightEye();
                drawLeftEye();
        }
    }

    move() {
        switch (this.direction) {
            case "up":
                this.moveTo(
                    this.x % snakeCanvas.width,
                    this.y - this.height < 0
                        ? snakeCanvas.height
                        : this.y - this.height
                );
                this.currAxis = "-y";
                break;
            case "down":
                this.moveTo(
                    this.x % snakeCanvas.width,
                    (this.y + this.height) % snakeCanvas.height
                );
                this.currAxis = "+y";
                break;
            case "left":
                this.moveTo(
                    this.x - this.width < 0
                        ? snakeCanvas.width
                        : this.x - this.width,
                    this.y % snakeCanvas.height
                );
                this.currAxis = "-x";
                break;
            case "right":
                this.moveTo(
                    (this.x + this.width) % snakeCanvas.width,
                    this.y % snakeCanvas.height
                );
                this.currAxis = "+x";
                break;
        }
    }
}

class Treat extends Segment {
    constructor(ctx, color = "rgb(255, 0, 0") {
        super(null, null, ctx, color);
        this.x = this.randomPos(ctx.canvas.width);
        this.y = this.randomPos(ctx.canvas.height);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        super.draw(this.x, this.y);
        this.ctx.fillStyle = "rgb(0, 0, 0)";
    }

    randomPos(max) {
        var num = Math.floor(Math.random() * max);
        return parseInt(num / 10, 10) * 10;
    }
}

class Serpent {
    constructor(x, y, ctx, direction = "right") {
        this.head = new Head(x, y, ctx, direction);
        this.segments = [this.head];
        this.ctx = ctx;
    }

    move() {
        for (var i = 1; i < this.segments.length; i++) {
            this.segments[i].targetX = this.segments[i - 1].x;
            this.segments[i].targetY = this.segments[i - 1].y;

            if (
                this.segments[i].x == this.segments[i].targetX &&
                this.segments[i].targetY > this.segments[i].y
            ) {
                this.segments[i].currAxis = "+y";
            }

            if (
                this.segments[i].y == this.segments[i].targetY &&
                this.segments[i].targetX > this.segments[i].x
            ) {
                this.segments[i].currAxis = "+x";
            }

            if (
                this.segments[i].x == this.segments[i].targetX &&
                this.segments[i].targetY < this.segments[i].y
            ) {
                this.segments[i].currAxis = "-y";
            }

            if (
                this.segments[i].y == this.segments[i].targetY &&
                this.segments[i].targetX < this.segments[i].x
            ) {
                this.segments[i].currAxis = "-x";
            }
        }

        this.head.move();

        for (i = 1; i < this.segments.length; i++) {
            this.segments[i].chase();
        }
    }

    get length() {
        return this.segments.length;
    }

    get tail() {
        return this.segments[this.segments.length - 1];
    }

    get touchingSelf() {
        for (var i = 1; i < this.segments.length; i++) {
            var seg = this.segments[i];
            if (this.head.x == seg.x && this.head.y == seg.y) return true;
        }
        return false;
    }

    addSegment() {
        var seg = new Segment(null, null, this.ctx);
        switch (this.tail.currAxis) {
            case "+y":
                seg.x = this.tail.x;
                seg.y = this.tail.y - seg.height;
                break;
            case "+x":
                seg.x = this.tail.x - seg.width;
                seg.y = this.tail.y;
                break;
            case "-y":
                seg.x = this.tail.x;
                seg.y = this.tail.y + seg.height;
                break;
            case "-x":
                seg.x = this.tail.x + seg.width;
                seg.y = this.tail.y;
        }
        this.segments.push(seg);
        seg.draw(seg.x, seg.y);
    }
}

const INITIAL_FPS = 15;

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.serpent = new Serpent(
            canvas.width / 2,
            canvas.height / 2,
            this.ctx
        );
        this.fps = INITIAL_FPS;
        this.treat = new Treat(this.ctx);
        this._over = false;
    }

    get score() {
        return this.serpent.length - 1;
    }

    get over() {
        return this._over || this.serpent.touchingSelf; // || this.outOfBounds
    }

    set over(newOver) {
        this._over = newOver;
    }

    get outOfBounds() {
        return (
            this.serpent.head.x > this.canvas.width - this.serpent.head.width ||
            this.serpent.head.x < 0 ||
            this.serpent.head.y >
                this.canvas.height - this.serpent.head.height ||
            this.serpent.head.y < 0
        );
    }

    get direction() {
        return this.serpent.head.direction;
    }

    set direction(newDirection) {
        this.serpent.head.direction = newDirection;
    }

    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.serpent = new Serpent(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.ctx
        );
        this.fps = INITIAL_FPS;
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    play() {
        document.addEventListener("keydown", this.handleKeyPress);
        this.over = false;
        var game = this;
        this.loop = setTimeout(function () {
            game.serpent.move();
            game.checkTreat();
            game.offerTreat();
            if (game.over) {
                hideSnake();
                output("Game over. Score: " + game.score);
                game.reset();
                return;
            } else {
                game.play();
            }
        }, 1000 / this.fps);

        this.offerTreat();
    }

    offerTreat() {
        this.treat.draw();
    }

    checkTreat() {
        if (
            this.serpent.head.x == this.treat.x &&
            this.serpent.head.y == this.treat.y
        ) {
            this.serpent.addSegment();
            this.treat = new Treat(this.ctx);
            this.fps += 0.7;
        }
    }

    quit() {
        game.over = true;
    }

    handleKeyPress(e) {
        switch (e.keyCode) {
            case 38:
                if (game.direction != "down") {
                    game.direction = "up";
                }
                break;
            case 40:
                if (game.direction != "up") {
                    game.direction = "down";
                }
                break;
            case 37:
                if (game.direction != "right") {
                    game.direction = "left";
                }
                break;
            case 39:
                if (game.direction != "left") {
                    game.direction = "right";
                }
                break;
            case 81:
                e.preventDefault();
                game.quit();
        }
    }
}
`},
]},
]}];
