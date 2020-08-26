import {constructDurationTree} from './duration-tree';

describe('constructDurationTree', () => {
  it('constructs correct 4/4 tree', () => {
    expect(constructDurationTree()).toEqual({
      noteValue: 1,
      position: 0,
      leftChild: {
        noteValue: 2,
        position: 0,
        leftChild: {
          noteValue: 4,
          position: 0,
          leftChild: {
            noteValue: 8,
            position: 0,
            leftChild: {
              noteValue: 16,
              position: 0,
              leftChild: {
                noteValue: 32,
                position: 0,
              },
              rightChild: {
                noteValue: 32,
                position: 1,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 2,
              leftChild: {
                noteValue: 32,
                position: 2,
              },
              rightChild: {
                noteValue: 32,
                position: 3,
              }
            }
          },
          rightChild: {
            noteValue: 8,
            position: 4,
            leftChild: {
              noteValue: 16,
              position: 4,
              leftChild: {
                noteValue: 32,
                position: 4,
              },
              rightChild: {
                noteValue: 32,
                position: 5,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 6,
              leftChild: {
                noteValue: 32,
                position: 6,
              },
              rightChild: {
                noteValue: 32,
                position: 7,
              }
            }
          }
        },
        rightChild: {
          noteValue: 4,
          position: 8,
          leftChild: {
            noteValue: 8,
            position: 8,
            leftChild: {
              noteValue: 16,
              position: 8,
              leftChild: {
                noteValue: 32,
                position: 8,
              },
              rightChild: {
                noteValue: 32,
                position: 9,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 10,
              leftChild: {
                noteValue: 32,
                position: 10,
              },
              rightChild: {
                noteValue: 32,
                position: 11,
              }
            }
          },
          rightChild: {
            noteValue: 8,
            position: 12,
            leftChild: {
              noteValue: 16,
              position: 12,
              leftChild: {
                noteValue: 32,
                position: 12,
              },
              rightChild: {
                noteValue: 32,
                position: 13,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 14,
              leftChild: {
                noteValue: 32,
                position: 14,
              },
              rightChild: {
                noteValue: 32,
                position: 15,
              }
            }
          }
        }
      },
      rightChild: {
        noteValue: 2,
        position: 16,
        leftChild: {
          noteValue: 4,
          position: 16,
          leftChild: {
            noteValue: 8,
            position: 16,
            leftChild: {
              noteValue: 16,
              position: 16,
              leftChild: {
                noteValue: 32,
                position: 16,
              },
              rightChild: {
                noteValue: 32,
                position: 17,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 18,
              leftChild: {
                noteValue: 32,
                position: 18,
              },
              rightChild: {
                noteValue: 32,
                position: 19,
              }
            }
          },
          rightChild: {
            noteValue: 8,
            position: 20,
            leftChild: {
              noteValue: 16,
              position: 20,
              leftChild: {
                noteValue: 32,
                position: 20,
              },
              rightChild: {
                noteValue: 32,
                position: 21,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 22,
              leftChild: {
                noteValue: 32,
                position: 22,
              },
              rightChild: {
                noteValue: 32,
                position: 23,
              }
            }
          }
        },
        rightChild: {
          noteValue: 4,
          position: 24,
          leftChild: {
            noteValue: 8,
            position: 24,
            leftChild: {
              noteValue: 16,
              position: 24,
              leftChild: {
                noteValue: 32,
                position: 24,
              },
              rightChild: {
                noteValue: 32,
                position: 25,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 26,
              leftChild: {
                noteValue: 32,
                position: 26,
              },
              rightChild: {
                noteValue: 32,
                position: 27,
              }
            }
          },
          rightChild: {
            noteValue: 8,
            position: 28,
            leftChild: {
              noteValue: 16,
              position: 28,
              leftChild: {
                noteValue: 32,
                position: 28,
              },
              rightChild: {
                noteValue: 32,
                position: 29,
              }
            },
            rightChild: {
              noteValue: 16,
              position: 30,
              leftChild: {
                noteValue: 32,
                position: 30,
              },
              rightChild: {
                noteValue: 32,
                position: 31,
              }
            }
          }
        }
      }
    });
  });
});
