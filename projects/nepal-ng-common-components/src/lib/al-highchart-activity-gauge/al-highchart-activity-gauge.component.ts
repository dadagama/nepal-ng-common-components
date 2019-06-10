/*
 * Highcharts Activity Gauge Component
 *
 * @author stephen.jones <stephen.jones@alertlogic.com>
 * @copyright Alert Logic 2019
 *
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AlHighchartsActivityGaugeService } from './al-highchart-activity-gauge.service';
import * as Highcharts from 'highcharts/highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { ActivityGaugeConfig } from '../types';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);


@Component({
    selector: 'al-highchart-activity-gauge',
    templateUrl: './al-highchart-activity-gauge.component.html',
    styleUrls: ['./al-highchart-activity-gauge.component.scss']
})

export class AlHighchartsActivityGaugeComponent implements OnInit {

    /*
     * Variables
     */
    public chart: Highcharts.Chart;

    public themeToggle = false;
    /*
     *  Elements
     */
    @ViewChild('chartTarget') chartTarget: ElementRef;

    /*
     *  Inputs
     */
    @Input() config: ActivityGaugeConfig;

    /*
     *  Outputs
     */

    constructor(
        private gaugeService: AlHighchartsActivityGaugeService
    ) {}

    /*
     *
     */
    ngOnInit() {
        this.chart = Highcharts.chart(this.chartTarget.nativeElement, this.gaugeService.getConfig(this.config));
    }

    toggleTheme() {
        this.themeToggle = !this.themeToggle;
        this.toggleDarkTheme();
    }

    toggleDarkTheme() {
        if ( this.themeToggle ) {
            this.chart.update({
                chart: {
                    backgroundColor: '#3C3C3C',
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                           color: '#EDEDED'
                        },
                    }
                },
            });
        } else {
            this.chart.update({
                chart: {
                    backgroundColor: '#ffffff',
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                           color: '#3C3C3C'
                        },
                    }
                },
            });
        }
    }
}

