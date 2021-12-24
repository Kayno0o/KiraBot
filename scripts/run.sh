#!/bin/bash

./scripts/stop.sh

yarn ts-node run.ts &

./scripts/reload.sh
