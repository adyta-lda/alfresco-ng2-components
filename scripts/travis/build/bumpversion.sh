#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR/../../../

if [[ $TRAVIS_BRANCH =~ ^develop(-patch.*)?$ ]]
then
    echo "Replace NPM version with new Alpha tag"
    NEXT_VERSION=-nextalpha
    ./scripts/update-version.sh -gnu $NEXT_VERSION || exit 1;
fi


