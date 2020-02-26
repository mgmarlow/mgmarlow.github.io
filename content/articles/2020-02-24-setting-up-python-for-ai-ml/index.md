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

## Anaconda Python distribution

[Anaconda](https://www.anaconda.com/) is a Python distribution that ships
with both environment and package management solutions. It offers everything
needed to spin up Python environments and manage dependencies effectively.

The flip-side is that the base install comes bundled with a ton of extra
bloat. Anaconda is about 3 GB and contains over 1,500 packages, of which most
engineers will only use a very small subset. Fortunately, Anaconda
provides an alternative distribution that is much smaller in size and scope.

## But Miniconda is better

[Miniconda](https://docs.conda.io/en/latest/miniconda.html) is Anaconda
but without the GUI and the pre-installed packages. As their website states,

> It is a small, bootstrap version of Anaconda that includes only conda,
> Python, the packages they depend on, and a small number of other useful
> packages, including pip, zlib and a few others.

The Miniconda documentation provides a
[compare and contrast](https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html#anaconda-or-miniconda)
to help decide which distribution one should use. That said, I strongly urge
readers to use Miniconda instead of Anaconda. No matter which distribution
is picked, familiarity with the fundamental CLI tool `conda` is required.
Miniconda forces familiarity with the CLI immediately, making it the better
distribution for those who are more focused on engineering.

## Setting up Miniconda

Besides installing Miniconda from the
[distributions page](https://docs.conda.io/en/latest/miniconda.html),
there are a couple of extra steps involved in setting up an environment.

First is initializing `conda` with a shell so it can activate
virtual environments. This is done using `conda init <SHELL NAME>`:

```
PS C:\Users\me> conda init powershell
```

The full list of available shells:

```
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

After conda is initialized the shell needs to be restarted.
If it was set up properly, a new prefix will appear in front of
the shell's regular output:

```
(base) PS C:\Users\me>
```

`(base)` indicates Miniconda's active virtual environment.
`conda env list` will display a list of all available virtual environments.
With initial installation, only `base` has been configured:

```
(base) PS C:\Users\me> conda env list
# conda environments:
#
base                  *  C:\Users\me\Miniconda3
```

All of the packages installed within `base` can be listed with
`conda list -n base`.

## Creating environments

Use `conda create` to create new virtual environments. The following
command will create a new environment named "my-env" with the
[pandas](https://pandas.pydata.org/) Python package. Note that
if `conda create` is called without the optional `python=x.x` argument,
Miniconda will decide which Python version to use.

```
(base) PS C:\Users\me> conda create -n my-env pandas
(base) PS C:\Users\me> conda env list
# conda environments:
#
base                  *  C:\Users\me\Miniconda3
my-env                   C:\Users\me\Miniconda3\envs\my-env
```

After an environment is created, it needs to be activated for use: 

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

Since no errors were observed, the environment has been successfully created
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

Armed with an environment configured with a few packages, let's
load it into [Visual Studio Code](https://code.visualstudio.com/). The
first thing to do after installing VSCode is to grab the
[Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python).
This will allow Python code to be executed directly from the editor using
a Miniconda virtual environment.

After the extension is installed, create a new file, `main.py` with the
following contents:

```py
# main.py

import pandas
print(pandas.__version__)
```

Then open the command palette with `Ctrl + Shift + P` and select
`> Python: Select Interpreter`. From the environment selections, pick
the one we just created, `my-env`. Doing so will
create a new folder `.vscode/` with a `settings.json` that contains the following:

```json
{
    "python.pythonPath": "C:\\Users\\me\\Miniconda3\\envs\\my-env\\python.exe"
}
```

Now you can execute the code in `main.py` by hitting the green play icon
in the upper-right corner of Visual Studio Code and it will run it against
your selected virtual environment.

And there you have it! A fully-configured virtual environment that enables
running code directly through Visual Studio Code.

## References and more information

* [Managing conda Environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
* [Working with Jupyter Notebooks in Visual Studio Code](https://code.visualstudio.com/docs/python/jupyter-support)
