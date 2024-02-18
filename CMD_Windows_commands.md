# Windows Command Prompt (CMD) Commands

## ASSOC

The assoc command is used to display or modify file extensions associations. The command can be used without parameters to display the current file associations.

```sh
assoc
```

This command will display the current file associations.

## CHKDSK (Check Disk)

The chkdsk command checks a disk for errors and, if requested, corrects any errors it finds.

```sh
chkdsk C:
```

This command will check the disk C: for errors.

## CIPHER

The cipher command provides the ability to encrypt or decrypt files/directories on NTFS partitions.

```sh
cipher /E
```

This command will encrypt the specified directory.

## CLS

The cls command clears the screen of all previously entered commands and other text.

```sh
cls
```

This command will clear the command prompt screen.

## DISKPART

The diskpart command is used to create, manage, and delete hard drive partitions.

```sh
diskpart
```

This command will start the DiskPart command interpreter.

## DRIVERQUERY

The driverquery command enables an administrator to display a list of installed device drivers and their properties.

```sh
driverquery
```

This command will display a list of all installed device drivers.

## GPUPDATE

The gpupdate command is used to update Group Policy settings.

```sh
gpupdate /force
```

This command will force an immediate update of Group Policy settings.

## IPCONFIG

The ipconfig command is used to display the IP configuration for all network interfaces on your computer.

```sh
ipconfig /all
```

This command will display detailed IP configuration data for all network interfaces.

## NETSTAT

The netstat command is used to display active TCP connections, ports on which the computer is listening, Ethernet statistics, the IP routing table, and IPv4/IPv6 statistics.

```sh
netstat -a
```

This command will display all active TCP connections and the TCP and UDP ports on which the computer is listening.

## NSLOOKUP

The nslookup command is used to query the DNS to obtain domain name or IP address mapping, or other DNS records.

```sh
nslookup <www.example.com>
```

This command will return the IP address of <www.example.com>.

## PATHPING

The pathping command provides information about network latency and network loss at intermediate hops between a source and destination.

```sh
pathping <www.example.com>
```

This command will provide latency and loss information for each network hop to reach <www.example.com>.

## PING

The ping command is used to test the ability of the source computer to reach a specified destination computer.

```sh
ping <www.example.com>
```

This command will send a network request to <www.example.com> and wait for a response.

## POWERCFG

The powercfg command is used to control power settings and configurations.

```sh
powercfg /hibernate on
```

This command will enable hibernation.

## SFC (System File Checker)

The sfc command is used to repair important Windows system files. The /scannow option scans the integrity of all protected system files and replaces incorrect versions with correct Microsoft versions.

```sh
sfc /scannow
```

This command will immediately scan all protected system files.

## SHUTDOWN

The shutdown command can be used to shut down, restart, or log off your computer or a remote computer.

```sh
shutdown /s /t 0
```

This command will shut down your computer immediately (/s stands for shutdown, /t 0 specifies the time delay).

## SYSTEMINFO

The systeminfo command is used to display detailed configuration information about a computer and its operating system.

```sh
systeminfo
```

This command will display detailed system information.

## TASKLIST

The tasklist command displays a list of applications and services with their Process ID (PID) for all tasks running on either a local or a remote computer.

```sh
tasklist
```

This command will display a list of currently running tasks.

## TRACERT

The tracert command is used to visually see a network packet being sent and received and the amount of hops required for that packet to get to its destination.

```sh
tracert <www.example.com>
```

This command will show the route that a packet takes to reach <www.example.com>.

## More commands will be added
