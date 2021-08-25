import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    Button,
} from "reactstrap";

var code = '';
var text = '';
class LandingPageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bgColor: 'white',
            textColor: 'black'
        }

        var h = Math.floor(Math.random() * 361);
        var s = Math.floor(Math.random() * 57) + 42;
        var l = Math.floor(Math.random() * 51) + 40;
        this.state.bgColor = `hsl(${h},${s}%,${l}%)`

        function hslToRgb(h, s, l){
            var r, g, b;
        
            if(s == 0) {
                r = g = b = l; // achromatic
            } else {
                var hue2rgb = function hue2rgb(p, q, t){
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }
        
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
        
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        var rgb = hslToRgb(h, s, l)
        const brightness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
        this.state.textColor = (brightness > 125) ? 'black' : 'white';
        
        text = this.props.page.headline + '\n' + this.props.page.subheading;
        for (var i = 0; i < this.props.page.sections.length; i++) {
            text += '\n' + this.props.page.sections[i].headline + '\n' + this.props.page.sections[i].subheading;
        }

        code = `
<html>
	<head>
		<title>${this.props.page.headline}</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
        <!-- Nucleo Icons -->
        <link href="https://demos.creative-tim.com/argon-design-system/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="https://demos.creative-tim.com/argon-design-system/assets/css/nucleo-svg.css" rel="stylesheet" />
        <!-- Font Awesome Icons -->
        <link href="https://demos.creative-tim.com/argon-design-system/assets/css/font-awesome.css" rel="stylesheet" />
        <link href="https://demos.creative-tim.com/argon-design-system/assets/css/nucleo-svg.css" rel="stylesheet" />
        <!-- CSS Files -->
        <link href="https://demos.creative-tim.com/argon-design-system/assets/css/argon-design-system.min.css?v=1.2.2" rel="stylesheet" />
	</head>
    <body>
        <div class="position-relative">
            <section class="section section-lg section-shaped" style="background-color: ${this.state.bgColor}">
                <div class="py-lg-md d-flex container">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-9" style="text-align: center; margin: auto">
                                <h1 class="display-3" style="color: ${this.state.textColor}">${this.props.page.headline}</h1>
                                <p class="lead" style="color: ${this.state.textColor}">${this.props.page.subheading}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    ${this.props.page.sections.map((section, index) => 
        index % 2 != 0 ?
        `    <section class="section section-small pb-0 px-5">
                <div class="container">
                    <div class="row">
                        <div class="d-flex align-items-center justify-content-center col-lg-6">
                            <img alt="..." class="img-center img-fluid w-100" src=${index%4==0 ? 'https://i.ibb.co/5rBJZ3Q/4.jpg' : index%3==0 ? 'https://i.ibb.co/YpJXJSD/Practice-collaboration-and-problem-solving-in-teams-by-completing-puzzle-games-Solving-problems-in-b.jpg' : index%2==0 ? 'https://i.ibb.co/YN0w9Zh/2.jpg' : 'https://i.ibb.co/12Bs5DF/Team-Work-In-Business-People-Cooperate-Solve-Puzzles-to-Find-Ideas-and-Solutions-in-Building-a-Start.jpg' } />
                        </div>
                        <div class="align-self-center col-lg-6">
                            <div class="pt-5 pt-lg-0 pl-lg-4">
                                <h3>${section.headline}</h3>
                                <p class="lead">${section.subheading}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        :
        `    <section class="section section-small pb-0 px-5">
                <div class="container">
                    <div class="row">
                        <div class="align-self-center col-lg-6">
                            <div class="pt-5 pt-lg-0 pl-lg-4">
                                <h3>${section.headline}</h3>
                                <p class="lead">${section.subheading}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center col-lg-6">
                            <img alt="..." class="img-center img-fluid w-100" src=${index%4==0 ? 'https://i.ibb.co/5rBJZ3Q/4.jpg' : index%3==0 ? 'https://i.ibb.co/YpJXJSD/Practice-collaboration-and-problem-solving-in-teams-by-completing-puzzle-games-Solving-problems-in-b.jpg' : index%2==0 ? 'https://i.ibb.co/YN0w9Zh/2.jpg' : 'https://i.ibb.co/12Bs5DF/Team-Work-In-Business-People-Cooperate-Solve-Puzzles-to-Find-Ideas-and-Solutions-in-Building-a-Start.jpg' } />
                        </div>
                    </div>
                </div>
            </section>`
    )}
    </body>
</html>`

    }

  render() {
    return (
    <>
        <div>
            <CopyToClipboard text={text}>
                <Button color="secondary" size="sm" type="button" style={{ marginBottom: '1em' }}>
                    Copy Text
                </Button>
            </CopyToClipboard>
            <CopyToClipboard text={code}>
                <Button color="secondary" size="sm" type="button" style={{ marginBottom: '1em' }}>
                    Copy Code
                </Button>
            </CopyToClipboard>
        </div>
      <div>
        <div class="position-relative">
            <section class="section section-lg section-shaped" style={{backgroundColor: this.state.bgColor}}>
                <div class="py-lg-md d-flex container">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-9" style={{textAlign: 'center', margin: 'auto'}}>
                                <h1 class="display-3" style={{color: this.state.textColor}}>{this.props.page.headline}</h1>
                                <p class="lead" style={{color: this.state.textColor}}>{this.props.page.subheading}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {this.props.page.sections.map((section, index) => 
            index % 2 != 0 ?
                <section class="section section-small pb-0 px-5">
                    <div class="container">
                        <div class="row">
                            <div class="d-flex align-items-center justify-content-center col-lg-6">
                                <img alt="..." class="img-center img-fluid w-100" src={index%4==0 ? require('./images/4.jpg').default : index%3==0 ? require('./images/3.jpg').default : index%2==0 ? require('./images/2.jpg').default : require('./images/1.jpg').default } />
                            </div>
                            <div class="align-self-center col-lg-6">
                                <div class="pt-5 pt-lg-0 pl-lg-4">
                                    <h3>{section.headline}</h3>
                                    <p class="lead">{section.subheading}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            :
                <section class="section section-small pb-0 px-5">
                    <div class="container">
                        <div class="row">
                            <div class="align-self-center col-lg-6">
                                <div class="pt-5 pt-lg-0 pl-lg-4">
                                    <h3>{section.headline}</h3>
                                    <p class="lead">{section.subheading}</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-center col-lg-6">
                                <img alt="..." class="img-center img-fluid w-100" src={index%4==0 ? require('./images/4.jpg').default : index%3==0 ? require('./images/3.jpg').default : index%2==0 ? require('./images/2.jpg').default : require('./images/1.jpg').default } />
                            </div>
                        </div>
                    </div>
                </section>
        )}
      </div>
    </>
    );
  }
}

export default LandingPageView;