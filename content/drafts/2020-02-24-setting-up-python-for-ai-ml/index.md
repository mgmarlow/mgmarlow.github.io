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
recommend going with Miniconda. It is substantially smaller and helps build
a stronger understanding of the packages that your Python programs depend
on. Although Anaconda contains most scientific packages that you'll need,
many common Python libraries (
[python-dotenv](https://pypi.org/project/python-dotenv/),
[pandas-datareader](https://pandas-datareader.readthedocs.io/en/latest/),
etc) still need to be installed manually via `pip`. It's worth learning
the CLI toolchain on its own so that you're equipped with the ultimate
way to solve any issues that come up.

## Setting up Miniconda

Besides installing Miniconda from the
[distributions page](https://docs.conda.io/en/latest/miniconda.html),
there are a couple of extra steps involved in setting up an environment.

The first is to initialize `conda` with your shell so you can activate
virtual environments. This is done using `conda init <SHELL NAME>`,
e.g. `conda init bash`.

A full listing of available shells:

```sh
To initialize your shell, run

    $ conda init <SHELL_NAME>

Currently supported shells are:
  - bash
  - cmd.exe
  - fish
  - tcsh
  - xonsh
  - zsh
  - powershell

See 'conda init --help' for more information and options.
```

After conda is initialized, restart your shell. You should see a
new prefix at the front of your prompt:

```
(base) PS C:\Users\me>
```

`(base)` indicates Miniconda's active virtual environment. If you
run `conda env list`, you'll see a list of all available virtual
environments:

```
(base) PS C:\Users\me> conda env list
# conda environments:
#
base                  *  C:\Users\me\Miniconda3
```

You can also see a list of all packages in this environment with
`conda list -n base`. But before we go further with the `conda`
CLI, let's set up our own environment.

## Creating an environment

Use `conda create` to create new virtual environments. The following
command will create a new environment named "my-env" with the
[pandas](https://pandas.pydata.org/) Python package. Note that
`conda create` will use the same version of python that `base`
is using by default.

```
(base) PS C:\Users\me> conda create -n my-env pandas
```

After an environment is created, we need to `activate` it to
actually use it.

```
(base) PS C:\Users\me> conda activate my-env
(my-env) PS C:\Users\me>
```

The shell prompt will automatically adjust to the new environment
that is activated. In this case: `my-env`. Test the new environment
by running python and importing pandas:

```
(my-env) PS C:\Users\me> python -i
>>> import pandas
>>>
```

Since no errors were observed, the environment is successfully created
and `pandas` is available for use. But `pandas` won't be enough for most
AI/ML projects, so let's add a few more packages.

```
(my-env) PS C:\Users\me> conda install -n my-env numpy jupyter
```

If packages are available via the
[Anaconda package repository](https://anaconda.org/anaconda/repo) they
can be added with `conda install -n <ENVIRONMENT NAME>`. Otherwise,
they'll need to be installed via `pip` like a normal Python package.

## Bonus: Visual Studio Code

Now that we have an environment configured with a few packages, let's
load it into [Visual Studio Code](https://code.visualstudio.com/). The
first thing to do after installing VSCode is to grab the
[Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python).
This will allow you to execute Python code directly from the editor using
your Miniconda virtual environment.

After the extension is installed, create a new file, `main.py` with the
following contents:

```py
# main.py

import pandas
print(pandas.__version__)
```

Then open the command palette with `Ctrl + Shift + P` and select
`> Python: Select Interpreter`. You should be prompted to select an environment,
where you can select select the one we just created, `my-env`. Doing so will
create a new folder `.vscode/` with a `settings.json` that contains the following:

```json
{
    "python.pythonPath": "C:\\Users\\me\\Miniconda3\\envs\\my-env\\python.exe"
}
```

Now you can execute the code in `main.py` by hitting the green play icon
in the upper-right corner of VSCode.

And there you have it! A fully-configured virtual environment that enables
running code directly through Visual Studio Code.

## References and more information

* [Managing conda Environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
* [Working with Jupyter Notebooks in Visual Studio Code](https://code.visualstudio.com/docs/python/jupyter-support)
