---
title: "Comandos de Git con ejemplos"
published: 2024-02-18
description: "Conozca los comandos esenciales de Git con ejemplos para optimizar su flujo de trabajo."
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
lang: "es"
originalSlug: "gitCommands"

---

## 1. Fusión de Git 

Git merge te permite combinar el trabajo de dos ramas en una.
```sh
git merge <branch>
```

:::tip
Utilice `git merge` para integrar cambios de una rama en otra, normalmente la rama principal.
:::--- 

## 2. Diferencias de Git 

Git diff muestra las diferencias entre dos confirmaciones o archivos dentro de su repositorio Git.
```sh
git diff <source branch> <target branch>
```

## 3. Registro de Git 

el`git log`El comando enumera todas las confirmaciones en el historial de su proyecto.
```sh
git log
```

:::note
Utilice opciones como `--oneline` o `--graph` para simplificar o visualizar el registro.
:::--- 

## 4. Presentación de Git 

Git show muestra los detalles de un objeto Git específico (por ejemplo, confirmación, etiqueta o árbol).
```sh
git show <commit>
```

## 5. Git Grep 

Git grep busca en su código base apariciones de una cadena o patrón específico.
```sh
git grep -n <pattern>
```

## 6. Rama Git 

Cree o enumere ramas en su repositorio.
```sh
git branch
```

:::tip
Utilice `git branch -d <branch>` para eliminar una rama.
:::--- 

## 7. Git Push 

Envíe sus confirmaciones locales a un repositorio remoto.
```sh
git push -u <remote> <branch>
```

## 8. Alijo de Git 

Guarde los cambios temporalmente sin confirmarlos.
```sh
git stash
```

:::important
Recuerde ejecutar `git stash pop` para volver a aplicar los cambios guardados.
:::--- 

## 9. Rebase de Git 

Actualice una rama aplicando confirmaciones sobre una rama base.
```sh
git rebase <base>
```

:::caution
Asegúrese de conocer la diferencia entre "rebase" y "merge" para evitar reescrituras no deseadas del historial.
:::--- 

## 10. Configuración de Git 

Configure u obtenga opciones globales o específicas del repositorio.
```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

<iframe widt h="100%" heigh t="468" sr c="https://www.youtube.com/embed/mJ-qvsxPHpY"title="Tutorial de Git para principiantes" frameborde r="0" allo w="acelerómetro; reproducción automática; escritura en portapapeles; medios cifrados; giroscopio; imagen en imagen; compartir web" enablefullscreen enablefullscreen></iframe> 

## 11. Clon de Git 

Clona un repositorio existente en tu máquina local.
```sh
git clone <repository>
```

## 12. Inicio de Git 

Crea un nuevo repositorio Git.
```sh
git init
```

## 13. Pago con Git 

Cambie entre ramas o restaure archivos.
```sh
git checkout <branch>
```

## 14. Restablecimiento de Git 

Restablezca su HEAD actual a una confirmación específica.
```sh
git reset <commit>
```

## 15. Etiqueta Git 

Administre etiquetas en su repositorio.
```sh
git tag
```

:::tip
Utilice `git tag -a <tag>` para crear una etiqueta anotada.
:::--- 

## 16. Archivo Git 

Cree un archivo de archivos de una confirmación o rama específica.
```sh
git archive
```

## 17. Confirmación de Git 

Registre los cambios en el repositorio.
```sh
git commit -m "Commit message"
```

## 18. Estado de Git 

Muestra el estado del árbol de trabajo.
```sh
git status
```

## 19. GitRM 

Elimine archivos del árbol de trabajo e indexe.
```sh
git rm <file>
```

## 20. Git remoto 

Administre un conjunto de repositorios rastreados.
```sh
git remote add <name> <url>
```

## 21. Git Instaweb 

Inicie un visor de repositorio Git local basado en la web.
```sh
git instaweb
```

## 22. Notas de Git 

Agregue información adicional a las confirmaciones.
```sh
git notes add <message>
```

## 23. Git Bisect 

Depura tu repositorio localizando una confirmación problemática.
```sh
git bisect
```

## 24. Submódulos de Git 

Importe otros repositorios como submódulos.
```sh
git submodule add <repository>
```

## 25. Informe de error de Git 

Compile un informe de error con información del sistema y del repositorio.
```sh
git bugreport
```

## 26. Git Fsck 

Verifique la integridad de su repositorio y recupere objetos inalcanzables.
```sh
git fsck
```

## 27. Git Stripspace 

Elimine los espacios en blanco finales de su repositorio.
```sh
git stripspace
```

## 28. Ganchos de Git 

Ejecute scripts automáticamente en respuesta a eventos del ciclo de vida de Git.
```sh
git hooks
```

## 29. Culpa a Git 

Muestra quién modificó por última vez una línea en un archivo.
```sh
git blame <file>
```

## 30. Git LFS (almacenamiento de archivos grandes) 

Administre archivos grandes en su repositorio Git.
```sh
git lfs
```

## 31. Recolección de basura de Git 

Optimice su repositorio limpiando archivos innecesarios.
```sh
git gc
```

## 32. Descripción de Git 

Genere un nombre legible para una confirmación basada en la etiqueta más reciente.
```sh
git describe
```

## 33. Git Reflog 

Ver todas las acciones de Git realizadas en el repositorio.
```sh
git reflog
```

## 34. Registro de Git (mejorado) 

Visualice registros de confirmación con opciones adicionales.
```sh
git log --graph --oneline
```

## 35. Selección de cereza de Git 

Aplique una confirmación de otra rama a su rama actual.
```sh
git cherry-pick <commit>
```

## 36. Cambio de Git 

Cambie rápidamente entre ramas.
```sh
git switch <branch>
```

:::note
`git switch` es una alternativa moderna a `git checkout` para cambiar de rama.
:::--- 

<iframe widt h="100%" heigh t="468" sr c="https://www.youtube.com/embed/K6Q31YkorUE"title="Reproductor de vídeo de YouTube" frameborde r="0" 
allo w="acelerómetro; reproducción automática; escritura en portapapeles; medios cifrados; giroscopio; imagen en imagen; compartir web" enablefullscreen enablefullscreen></iframe>