#!/bin/bash

eval "$(ssh-agent)"  
ssh-add ~/.ssh/id_rsa
echo $(git pull origin master)

