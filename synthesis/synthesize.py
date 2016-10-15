#!/usr/bin/python

import sys
import os

lyric_dir = 'lyrics/'
synth_dir = 'synth/'
bg_track_dir = 'bg_tracks/'
output_dir = 'output/'

bg_track_fn = ['0_to_100.mp3','black_and_yellow.mp3','hotline_bling.mp3','panda.mp3','rap_god.mp3']
bg_track_bpm = ['89','164','135','145','148']
bg_track = 0

try:
	lyric_fn = str(sys.argv[1])
except:
	print "Usage: synthesize.py [lyric file name] [background track ID (0-4)] [pitch (0-99)]"
try: 
	bg_track = int(sys.argv[2])
except IndexError:
	print "Usage: synthesize.py [lyric file name] [background track ID (0-4)] [pitch (0-99)]"
try: 
	pitch = str(sys.argv[3]) 
except IndexError:
	pass

os.system('rm '+synth_dir+'*') 

os.system('espeak -f'+lyric_dir+lyric_fn+' -p'+pitch+' -s'+bg_track_bpm[bg_track]+' -w'+synth_dir+lyric_fn+'.wav')
os.system('sox '+synth_dir+lyric_fn+'.wav '+synth_dir+lyric_fn+'b.wav speed 0.5')
os.system('sox -r 44100 '+synth_dir+lyric_fn+'b.wav '+synth_dir+lyric_fn+'c.wav')
os.system('sox -M '+bg_track_dir+bg_track_fn[bg_track]+' '+synth_dir+lyric_fn+'c.wav '+output_dir+lyric_fn+'_mix.ogg')