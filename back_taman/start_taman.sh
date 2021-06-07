#!/usr/bin/env bash
nohup java -jar ~/demotaman/target/taman-back-1.0.1-SNAPSHOT.war  > ~/demotaman/demotaman.txt 2>&1 &
echo $! > ~/demotaman/pid.file
