#!/bin/bash
cat $1 | sed 's/\([>;]\)\([a-zA-Z ]*\): /\1<b>\2<\/b>: /g' | sed 's/Updated automatically every 5 minutes//' | sed 's/\([Nn]\)icolas/\1icol&aacute;s/g' | sed 's/Pena/Pe&ntilde;a/g' > /tmp/tmp_file.html
mv /tmp/tmp_file.html $1