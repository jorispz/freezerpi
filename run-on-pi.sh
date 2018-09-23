
#!/bin/sh
session="freezerpi"

tmux start-server
tmux new-session -d -s $session

tmux splitw -v -p 30
tmux selectp -t 0
tmux splitw -h -p 20
tmux selectp -t 1
tmux splitw -v -p 80

tmux selectp -t 0
tmux send-keys "sleep 5" C-m
tmux send-keys "echo yarn run test-watch" C-m

tmux selectp -t 1
tmux send-keys "yarn run watch" C-m

tmux selectp -t 2
tmux send-keys "sleep 5" C-m
tmux send-keys "watch rsync -av -R dist/ pi@freezerpi:freezerpi" C-m

tmux selectp -t 3
tmux send-keys "ssh pi@freezerpi" C-m

tmux attach-session -t $session