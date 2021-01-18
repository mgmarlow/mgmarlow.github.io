---
path: '/articles/setting-up-python-ai-ml'
title: 'Python Virtual Environments for AI/ML'
date: '2020-03-01'
---

Virtual environments are the bee's knees. With them developers
can spin up any version of Python at a moment's notice, add
or remove dependencies without worrying about mismatch errors,
and have more confidence in their project's future.

But which of the dozens of ways to configure virtual environments
is the best? In this article, I'll step through my preferred
solution using [Miniconda](https://docs.conda.io/en/latest/miniconda.html).

## Anaconda Python distribution

Most Python developers are familiar with [Anaconda](https://www.anaconda.com/),
a distribution aimed at data science that ships with a wide variety of features.
It includes virtual environment automation and package management, as well as
commonly-used Python packages.

The flip-side is that the base install comes bundled with a ton of extra
bloat. Anaconda is about 3 GB and contains over 1,500 packages, of which most
engineers will only use a very small subset. In addition, it divides its tools
across a slow and obtuse GUI that is more cumbersome to use than its CLI
counterpart. Fortunately, Anaconda provides an alternative distribution
that is much smaller in size and scope.

## Enter Miniconda

[Miniconda](https://docs.conda.io/en/latest/miniconda.html) is Anaconda
but without the GUI and the pre-installed packages. As their website states,

> It is a small, bootstrap version of Anaconda that includes only conda,
> Python, the packages they depend on, and a small number of other useful
> packages, including pip, zlib and a few others.

The Miniconda documentation provides a
[compare and contrast](https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html#anaconda-or-miniconda)
to help choose a distribution. That said, I strongly urge
readers to use Miniconda instead of Anaconda. Not only is it drastically
smaller in size, the `conda` CLI interface is much easier for engineers
to learn than the GUI.

## Setting up Miniconda

Besides installing Miniconda from the
[distributions page](https://docs.conda.io/en/latest/miniconda.html),
there are a couple of extra steps involved in setting up an environment.

First is initializing `conda` with a shell so it can activate
virtual environments. This is done using `conda init <SHELL NAME>`:

```
PS C:\Users\me> conda init powershell
```

Here's the full list of available shells:

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
With the initial installation, only `base` has been configured:

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
AI/ML projects, so I'll add a few more packages.

```
(my-env) PS C:\Users\me> conda install -n my-env numpy jupyter
```

If packages are available via the
[Anaconda package repository](https://anaconda.org/anaconda/repo) they
can be added with `conda install -n <ENVIRONMENT NAME>`. Otherwise,
they'll need to be installed with `pip` like a normal Python package.

> When using `pip`:
> 
> Make sure that the desired environment is activated
> before `pip` is run. e.g. if I want to install a package into `my-env`,
> I first `conda activate my-env`, then run `pip install <package>`. This
> ensures the package is installed into the proper environment.

## Bonus: Visual Studio Code

Now that I have an environment configured with a few packages, I'll
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
`> Python: Select Interpreter`. From the environment selections, I'll pick
the one I just created, `my-env`. Doing so will create a new folder,
`.vscode/`, with a `settings.json` that contains the following:

```json
{
    "python.pythonPath": "C:\\Users\\me\\Miniconda3\\envs\\my-env\\python.exe"
}
```

Now I can execute the code in `main.py` by hitting the green play icon
in the upper-right corner of Visual Studio Code and it will run it against
my selected virtual environment, `my-env`.

## References and more information

* [Managing conda Environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
* [Working with Jupyter Notebooks in Visual Studio Code](https://code.visualstudio.com/docs/python/jupyter-support)
