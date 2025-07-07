import { tsParticles } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'

export const confetti = (
  element: HTMLElement,
  options: { x: number; y: number } = { x: 50, y: 50 }
) => {
  tsParticles
    .load({
      element: element,
      options: {
        fullScreen: {
          zIndex: 10
        },
        particles: {
          number: {
            value: 0
          },
          color: {
            value: ['#00FFFC', '#FC00FF', '#fffc00']
          },
          shape: {
            type: ['circle', 'square'],
            options: {}
          },
          opacity: {
            value: {
              min: 0,
              max: 1
            },
            animation: {
              enable: true,
              speed: 2,
              startValue: 'max',
              destroy: 'min'
            }
          },
          size: {
            value: {
              min: 2,
              max: 4
            }
          },
          links: {
            enable: false
          },
          life: {
            duration: {
              sync: true,
              value: 5
            },
            count: 1
          },
          move: {
            enable: true,
            gravity: {
              enable: true,
              acceleration: 10
            },
            speed: {
              min: 10,
              max: 20
            },
            decay: 0.1,
            direction: 'none',
            straight: false,
            outModes: {
              default: 'destroy',
              top: 'none'
            }
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: 'random',
            move: true,
            animation: {
              enable: true,
              speed: 60
            }
          },
          tilt: {
            direction: 'random',
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 60
            }
          },
          roll: {
            darken: {
              enable: true,
              value: 25
            },
            enable: true,
            speed: {
              min: 15,
              max: 25
            }
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 15
            }
          }
        },
        emitters: {
          life: {
            count: 1,
            duration: 0.1,
            delay: 0.4
          },
          rate: {
            delay: 0.1,
            quantity: 150
          },
          size: {
            width: 0,
            height: 0
          },
          position: {
            x: options.x,
            y: options.y
          }
        }
      }
    })
    .then(() => {
      loadFull(tsParticles)
    })
}

export const fallingConfetti = (element: HTMLElement) => {
  tsParticles
    .load({
      element: element,
      options: {
        fullScreen: {
          zIndex: 1
        },
        particles: {
          color: {
            value: ['#FFFFFF', '#FFd700']
          },
          move: {
            direction: 'bottom',
            enable: true,
            outModes: {
              default: 'out'
            },
            size: true,
            speed: {
              min: 1,
              max: 3
            }
          },
          number: {
            value: 500,
            density: {
              enable: true
              // area: 800
            }
          },
          opacity: {
            value: 1,
            animation: {
              enable: false,
              startValue: 'max',
              destroy: 'min',
              speed: 0.3,
              sync: true
            }
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: 'random',
            move: true,
            animation: {
              enable: true,
              speed: 60
            }
          },
          tilt: {
            direction: 'random',
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 60
            }
          },
          shape: {
            type: ['circle', 'square', 'triangle', 'polygon'],
            options: {
              polygon: [
                {
                  sides: 5
                },
                {
                  sides: 6
                }
              ]
            }
          },
          size: {
            value: {
              min: 2,
              max: 4
            }
          },
          roll: {
            darken: {
              enable: true,
              value: 30
            },
            enlighten: {
              enable: true,
              value: 30
            },
            enable: true,
            speed: {
              min: 15,
              max: 25
            }
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 15
            }
          }
        }
      }
    })
    .then(() => {
      loadFull(tsParticles)
    })
}

export const explosionConfetti = (element: HTMLElement) => {
  tsParticles
    .load({
      element: element,
      options: {
        fullScreen: {
          zIndex: 1
        },
        particles: {
          number: {
            value: 0
          },
          color: {
            value: ['#00FFFC', '#FC00FF', '#fffc00']
          },
          shape: {
            type: ['circle', 'square', 'triangle'],
            options: {
              polygon: [
                {
                  sides: 5
                },
                {
                  sides: 6
                }
              ]
            }
          },
          opacity: {
            value: {
              min: 0,
              max: 1
            },
            animation: {
              enable: true,
              speed: 2,
              startValue: 'max',
              destroy: 'min'
            }
          },
          size: {
            value: {
              min: 2,
              max: 4
            }
          },
          links: {
            enable: false
          },
          life: {
            duration: {
              sync: true,
              value: 5
            },
            count: 1
          },
          move: {
            enable: true,
            gravity: {
              enable: true,
              acceleration: 10
            },
            speed: {
              min: 10,
              max: 20
            },
            decay: 0.1,
            direction: 'none',
            straight: false,
            outModes: {
              default: 'destroy',
              top: 'none'
            }
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: 'random',
            move: true,
            animation: {
              enable: true,
              speed: 60
            }
          },
          tilt: {
            direction: 'random',
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 60
            }
          },
          roll: {
            darken: {
              enable: true,
              value: 25
            },
            enable: true,
            speed: {
              min: 15,
              max: 25
            }
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 15
            }
          }
        },
        emitters: {
          life: {
            count: 0,
            duration: 0.1,
            delay: 0.4
          },
          rate: {
            delay: 0.1,
            quantity: 150
          },
          size: {
            width: 0,
            height: 0
          }
        }
      }
    })
    .then(() => {
      loadFull(tsParticles)
    })
}

export const canionConfetti = (element: HTMLElement) => {
  tsParticles
    .load({
      element: element,
      options: {
        fullScreen: {
          zIndex: 1
        },
        emitters: {
          position: {
            x: 50,
            y: 100
          },
          rate: {
            quantity: 5,
            delay: 0.1
          }
        },
        particles: {
          color: {
            value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E', '#00FFFF', '#FF00D6', '#FF0000']
          },
          move: {
            decay: 0.05,
            direction: 'top',
            enable: true,
            gravity: {
              enable: true
            },
            outModes: {
              top: 'none',
              default: 'destroy'
            },
            speed: {
              min: 50,
              max: 100
            }
          },
          number: {
            value: 0
          },
          opacity: {
            value: 1
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: 'random',
            animation: {
              enable: true,
              speed: 30
            }
          },
          tilt: {
            direction: 'random',
            enable: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 30
            }
          },
          size: {
            value: 3,
            animation: {
              enable: true,
              startValue: 'min',
              count: 1,
              speed: 16,
              sync: true
            }
          },
          roll: {
            darken: {
              enable: true,
              value: 25
            },
            enlighten: {
              enable: true,
              value: 25
            },
            enable: true,
            speed: {
              min: 5,
              max: 15
            }
          },
          wobble: {
            distance: 30,
            enable: true,
            speed: {
              min: -7,
              max: 7
            }
          },
          shape: {
            type: ['circle', 'square', 'triangle', 'polygon'],
            options: {}
          }
        },
        responsive: [
          {
            maxWidth: 1024,
            options: {
              particles: {
                move: {
                  speed: {
                    min: 33,
                    max: 66
                  }
                }
              }
            }
          }
        ]
      }
    })
    .then(() => {
      loadFull(tsParticles)
    })
}
