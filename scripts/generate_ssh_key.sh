#!/bin/bash

# Ustawienie nazwy pliku dla klucza SSH
KEY_NAME="id_rsa"

# Generowanie klucza SSH
ssh-keygen -t rsa -b 4096 -f $KEY_NAME -N ""

# Wypisanie klucza publicznego w konsoli
echo "Publiczny klucz SSH:"
cat "${KEY_NAME}.pub"
