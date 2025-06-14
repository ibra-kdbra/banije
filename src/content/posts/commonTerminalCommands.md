---
title: Common Terminal Commands
published: 2022-09-20
description: 'Learn key terminal commands and their usage.'
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: 'Guides'
draft: false 
---

# Common Terminal Commands

:::note[Overview]
This guide provides a comprehensive list of essential terminal commands, organized by categories like navigation, file management, and more. Perfect for beginners and advanced users alike.
:::

## Key Commands & Navigation

:::tip
Keyboard shortcuts can save time when navigating and using the terminal.
:::

- `Up Arrow`: Will show your last command
- `Down Arrow`: Will show your next command
- `Tab`: Will auto-complete your command
- `Ctrl + L`: Will clear the screen
- `Ctrl + C`: Will cancel a command
- `Ctrl + R`: Will search for a command
- `Ctrl + D`: Will exit the terminal

## Manual Command

:::note[Using `man` Command]
The `man` command displays manuals for commands on Linux and MacOS. Use `--help` for similar functionality on Git Bash.
:::

```bash
man ls
```

On Git Bash or Windows:

```bash
ls --help
```

## The `whoami` Command

:::important[Identify Current User]
The `whoami` command displays the current logged-in user.
:::

```bash
whoami
```

## The `date` Command

:::tip[Get Current Date & Time]
The `date` command shows the current date and time.
:::

```bash
date
```

## File System Navigation

:::note[Essential Navigation Commands]
File system navigation is fundamental to terminal usage.
:::

| Command                             | Description                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| pwd                                 | Lists the path to the working directory                                           |
| ls                                  | List directory contents                                                           |
| ls -a                               | List contents including hidden files (Files that begin with a dot)                |
| ls -l                               | List contents with more info including permissions (long listing)                 |
| ls -r                               | List contents reverse order                                                       |
| cd                                  | Change directory to home                                                          |
| cd [dirname]                        | Change directory to specific directory                                            |
| cd ~                                | Change to home directory                                                          |
| cd ..                               | Change to parent directory                                                        |
| cd -                                | Change to previous directory                                                      |
| find [dirtosearch] -name [filename] | Find location of a program                                                        |

Combine flags, e.g., `ls -la` to view detailed and hidden files.

## Opening a Folder or File

:::note[Open Directories, Files, or URLs]
Commands differ across operating systems for opening files, folders, or URLs.
:::

- Mac: `open [dirname]`
- Windows: `start [dirname]`
- Linux: `xdg-open [dirname]`

```bash
open https://example.com
```

## Modifying Files & Directories

:::important[File & Directory Management Commands]
Learn to create, delete, move, and rename files and directories.
:::

| Command                     | Description                                         |
| --------------------------- | --------------------------------------------------- |
| mkdir [dirname]             | Make directory                                      |
| touch [filename]            | Create file                                         |
| rm [filename]               | Remove file                                         |
| rm -i [filename]            | Remove file with confirmation                       |
| rm -r [dirname]             | Remove directory                                    |
| rm -rf [dirname]            | Force remove directory                              |
| rm ./\*                     | Remove everything in the current folder             |
| cp [filename] [dirname]     | Copy file                                           |
| mv [filename] [dirname]     | Move file                                           |
| mv [filename] [filename]    | Rename file                                         |

Create nested directories:

```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

Run multiple commands:

```bash
cd test2 && mkdir test3
```

## Right Angle Bracket `>`

:::tip[Redirect Output]
Redirect command output into a file.
:::

```bash
> [filename]
```

Exit with `Ctrl+D`.

## The `cat` Command

:::note[Concatenate Files]
`cat` displays or creates files and combines them.
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

Show line numbers:

```bash
cat -n [filename]
```

## The `less` Command

:::tip[View File Contents]
Scroll through a file with `less`.
:::

```bash
less [filename]
```

Exit with `q`.

## The `echo` Command

:::important[Display Text or Write to Files]
Echo text to the terminal or files.
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

## The `nano` Command

:::note[Edit Text Files]
`nano` is a user-friendly text editor.
:::

```bash
nano [filename]
```

Exit with `Ctrl+X`. Save with `Y`.

## The `head` and `tail` Commands

:::tip[View File Parts]
Display the start (`head`) or end (`tail`) of files.
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

## The `grep` Command

:::note[Search File Content]
Search for text patterns in files.
:::

```bash
grep [searchterm] [filename]
```

## The `find` Command

:::important[Locate Files or Directories]
Search files by name, pattern, or properties.
:::

```bash
find [dirname] -name [filename]
```

Create test files:

```bash
touch file-{001..100}.txt
find . -empty
```

Remove files:

```bash
find . -name "file-*" -delete
```

## Piping

:::tip[Redirect Output]
Pipe the output of one command to another.
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

## Creating a Symlink

:::note[Create Shortcuts]
Create symbolic links to files.
:::

```bash
ln -s [filename] [symlinkname]
```

Remove with:

```bash
rm [symlinkname]
```

## File Compression

:::important[Manage Archives]
Create and extract tarballs with `tar`.
:::

| Command                             | Description                |
| ----------------------------------- | -------------------------- |
| tar czvf [dirname].tar.gz [dirname] | Create tarball             |
| tar tzvf [dirname]                  | View tarball contents      |
| tar xzvf [dirname].tar.gz           | Extract tarball            |

## The `history` Command

:::note[Command History]
View and execute past commands.
:::

```bash
history
!100
```

Run the 100th command in the history.

## Provided Guide for all the commands
:::important
:::
I did add all the terminal commands that is known in this [TerCli](https://tercli.netlify.app/)

