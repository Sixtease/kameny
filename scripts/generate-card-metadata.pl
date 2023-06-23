#!/usr/bin/env perl

use utf8;
use 5.010;
use strict;
use warnings;

use open qw(:std :utf8);
use JSON::XS qw();

my ($id, $name, %data);

while (<>) {
  chomp;
  if ($. % 2) {
    ($name, $id) = split m{/};
    $id //= $name;
  }
  elsif ($id eq '') {
    next;
  }
  else {
    $data{lc $id} = { exegesis => $_, name_cs => $name };
  }
}

my $json = JSON::XS->new->pretty->space_before(0)->canonical;
print $json->encode(\%data);
