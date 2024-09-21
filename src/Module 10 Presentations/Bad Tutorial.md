---
marp: true
theme: tailwind
transition: fade 0.15s
math: mathjax
size: 16:9
---

# Functions

Functions in Python are a powerful feature that allows programmers to define reusable blocks of code. A function is created using the `def` keyword, followed by the function name and parentheses that may include parameters. For instance, consider a function that implements the mathematical equation $f(x) = x^2$. This function can be defined as follows:

```python
def square(x):
    return x ** 2
```

When you call `square(3)`, it computes the square of 3 and returns 9. This simple example illustrates how functions can encapsulate mathematical operations, making them easier to use and understand in a broader context.

---

# Making functions readable

<div class='overflow-scroll'>

Making functions more understandable is essential for improving code readability and maintainability. One effective strategy is to use descriptive names that clearly convey the purpose of the function. For instance, instead of naming a function `f` or `func1`, a more meaningful name like `calculate_circle_area` immediately informs the reader about its function. Additionally, including parameter names that reflect their roles, such as `radius` instead of `r`, enhances clarity. This way, anyone reading the code can grasp the function’s intent without needing extensive comments or documentation.

Another important aspect is to include docstrings—short documentation strings that describe the function's purpose, parameters, and return values. This practice not only provides context but also allows tools like IDEs and documentation generators to present helpful information to users. For example, a function might include a docstring like this:

```python
def calculate_circle_area(radius):
    """Calculate the area of a circle given its radius.
    
    Args:
        radius (float): The radius of the circle.
    
    Returns:
        float: The area of the circle.
    """
    return math.pi * radius ** 2
```

This approach not only clarifies the function's behavior but also sets expectations for how it should be used, ultimately making the code more accessible for both current and future developers.

</div>

---

# Your tasks

Go through the exercises in your workbook and let me know if you have any questions.