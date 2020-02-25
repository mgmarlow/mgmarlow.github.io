---
path: '/setting-up-python-ai-ml'
title: 'Setting up Python for AI/ML'
date: '2020-02-24'
---

When getting started with ML in Python, it can be tempting to
install packages with `pip`. Even
Tensorflow [recommends this approach](https://www.tensorflow.org/install).
However, as soon you dive deep intor your first dependency-mismatch
debugging session, you'll understand why installing packages this way
is not advised.

Instead, utilize [virtual environments](https://docs.python.org/3/tutorial/venv.html).
With virtual environments, packages are added to lightweight containers
that can be created and destroyed with ease. You can even specify a Python
version for a given environment, enabling you to run multiple versions of
Python on the same machine.

## Enter Anaconda

[Anaconda](https://www.anaconda.com/) is a Python distribution that ships
with both environment and package management solutions. It offers everything
we need to spin up Python environments and manage dependencies, but it also
comes bundled with a ton of extra bloat. The base install is about 3 GB and
contains over 1,500 packages, of which you'll only use a very small subset.

## But Miniconda is better

Luckily, Anaconda (the company) also provides a smaller, more lightweight
distribution: [Miniconda](https://docs.conda.io/en/latest/miniconda.html).
As their website states,

> It is a small, bootstrap version of Anaconda that includes only conda,
> Python, the packages they depend on, and a small number of other useful
> packages, including pip, zlib and a few others.

The Miniconda documentation provides a great
[compare and contrast](https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html#anaconda-or-miniconda)
to help you decide which to install, but if you're a programmer I strongly
recommend going with Miniconda. You'll end up using the `conda` CLI more
often than the Anaconda GUI anyway, and there's no reason to clutter your
system with more packages than needed.

## Setting up Miniconda

Besides installing Miniconda from the
[distributions page](https://docs.conda.io/en/latest/miniconda.html),
there are quite a few extra steps involved in setting up an environment.

## Bonus: VSCode
