---
marp: true
theme: tailwind
transition: fade 0.15s
math: mathjax
size: 16:9
---

<!-- 
_class: title
 -->

# Tutorial 2: Functions in Python

---

# Agenda

- Recap: Functions
- Function as a communication tool

---

# Recap: Functions

A function takes an input and produces an output.

$$
f(x) = x ^ 2
$$

Then $f(2) = 2^2 = 4$.

In Python, define a function like this:

```python
def f(x):
    return x ** 2
```

And use it like this:

```python
f(2)
```

---

# Function as a Communication Tool

Given this function:

$$
p(d,u) = \frac{d^2 \pi u}{4}
$$

<div class='grid grid-cols-2 gap-2'>

<div>

In Python, you can write it like this:

> [!CARD]
> 
> ```python
> import math
> def p(d, u):
>     return (d ** 2 * math.pi * u) / 4
> ```

</div>

<div>

Or like this:

> [!CARD HIDDEN]
> 
> ```python
> import math
> def pizza_price(diameter, unit_price_per_cm):
>     radius = diameter / 2
>     area = math.pi * radius ** 2
>     return area * unit_price_per_cm
> ```

</div>

</div>

---

# Your turn

Copy the following function, and test with 
`diameter = 10` and `unit_price_per_cm = 0.1`.

```python
import math
def pizza_price(diameter, unit_price_per_cm):
    radius = diameter / 2
    area = math.pi * radius ** 2
    return area * unit_price_per_cm
```

> [!NOTE CALLOUT] 
> 
> Now, go through the exercises in your workbook and let me know if you have any questions!

---