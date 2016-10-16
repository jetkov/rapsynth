#!/usr/bin/python

import sys
import os

ident = '0000';
synth_dir = 'synthesis/synth/'
bg_track_dir = 'synthesis/bg_tracks/'
output_dir = 'views/output/'

bg_track_fn = ['0_to_100.mp3','black_and_yellow.mp3','hotline_bling.mp3','panda.mp3','rap_god.mp3']
bg_track_bpm = ['89','164','135','145','148']
bg_track = 0

try:
	ident = str(sys.argv[1])
except:
	print "Usage: synthesize.py [id number] [lyric file name] [background track ID (0-4)] [pitch (0-99)]"
try:
	lyrics = str(sys.argv[2])
except:
	print "Usage: synthesize.py [id number] [lyric file name] [background track ID (0-4)] [pitch (0-99)]"
try: 
	bg_track = int(sys.argv[3])
except IndexError:
	print "Usage: synthesize.py [id number] [lyric file name] [background track ID (0-4)] [pitch (0-99)]"
try: 
	pitch = str(sys.argv[4]) 
except IndexError:
	pass

os.system('rm ' + synth_dir + '*') 
print "Synthesizing text..."
os.system('espeak -p' + pitch + ' -s' + bg_track_bpm[bg_track] + ' -w' + synth_dir + ident + '.wav ' + '"' + lyrics + '"')
print "Stretching wav..."
os.system('sox ' + synth_dir + ident + '.wav ' + synth_dir + ident + 'b.wav speed 0.5')
print "Decreasing sample rate to match background tracks..."
os.system('sox -r 44100 ' + synth_dir + ident + 'b.wav ' + synth_dir + ident + 'c.wav')
print "Mixing lyrical and background tracks..."
os.system('sox -M ' + bg_track_dir + bg_track_fn[bg_track] + ' ' + synth_dir + ident + 'c.wav ' + output_dir + ident + '_mix.ogg')

exit()
