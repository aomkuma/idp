import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HttpServiceService } from '../../../services/http-service.service';
import { UploadServiceService } from '../../../services/upload-service.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-evaluate-form',
  templateUrl: './evaluate-form.component.html',
  styleUrls: ['./evaluate-form.component.scss']
})
export class EvaluateFormComponent implements OnInit {

  storage_url : any = environment.fileUrl;
  user_data :any;
  evaluate_form : any;
  step_type = 1;
  step_subtype = 1;
  prepare_stop = false;
  is_lastpage = false;
  constructor(private formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private uploadService: UploadServiceService,
              private tokenStorage: TokenStorageService
              ) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    // this.user_data.position = 'อาาจารย์เน้นวิจัย';
    this.getEvaluateForm();
  }

  getEvaluateForm() {
      this.httpService.callHTTPGet('evaluate/form/', this.user_data.id + '/' + this.user_data.personnel_type).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.evaluate_form = event.body['data'];
          this.step_type = this.evaluate_form[0].id;
          this.step_subtype = this.evaluate_form[0].subtype[0].page;
          console.log(this.step_subtype);
        }
      });
  }

  changeStep(step) {
    if (step == 'next') {
      this.step_subtype++;
    } else {
      this.step_subtype--;
    }
    this.is_lastpage = false;
    for (var i = 0; i < this.evaluate_form.length; i++) {
      if (this.evaluate_form[i].subtype != undefined) {
        // console.log(this.evaluate_form[i].subtype);
        for (var j = 0; j < this.evaluate_form[i].subtype.length; j++) {
          if (this.step_subtype == this.evaluate_form[i].subtype[j].page) {
            this.step_type = this.evaluate_form[i].id;
            if (j == (this.evaluate_form[i].subtype.length - 1) && i == (this.evaluate_form.length - 1)) {
              this.is_lastpage = true;
            }
          }
        }
      }
    }

    console.log('page ' + this.step_subtype);
  }

  calcScore(evaluate_type, subtype, question, choice) {
    var sum = 0;
    if (evaluate_type.formula == 'calc_avg_all') {
      sum = (choice.score * question.choice_list.weight) / question.choice_list.max_score;
      question['gain_score'] = sum;
      this.calcSumEvaluateFormScore();
    } else if (evaluate_type.formula == 'calc_sum_subtype') {
      if (subtype.formula == 'calc_by_sum_questions_max_score_in_subtype') {
        var max_subtype_score = subtype.max_score;
        var sum_max_score = 0;
        var size_of_choice = 0;
        for (var i = 0; i < subtype.questions.length; i++) {
          size_of_choice = subtype.questions[i].choice_list.properties.length - 1;
          sum_max_score += subtype.questions[i].choice_list.properties[size_of_choice].score;
        }
        sum = (choice.score * max_subtype_score) / sum_max_score;
        question['gain_score'] = sum;
        this.calcSumEvaluateFormScore();
      } else if (subtype.formula == 'calc_by_question_weight') {
        question['selected_choice'] = choice;
        if (!question.has_user_input) {
          sum = (choice.score * question.choice_list.weight) / question.choice_list.max_score;
          question['gain_score'] = sum;
        } else {
          if (question.user_input == null) {
            question.user_input = 0;
          }
          sum = (choice.score * question.user_input) / question.choice_list.max_score;
          question['gain_score'] = sum;
        }
        if (question.parent_question_id) {
          var score = 0;
          for (var i = 0; i < this.evaluate_form.length; i++) {
            if (this.evaluate_form[i].subtype != undefined) {
              for (var j = 0; j < this.evaluate_form[i].subtype.length; j++) {
                for (var k = 0; k < this.evaluate_form[i].subtype[j].questions.length; k++) {
                  if (question.parent_question_id == this.evaluate_form[i].subtype[j].questions[k].id) {
                    this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'] = 0;
                    this.evaluate_form[i].subtype[j].questions[k]['gain_score'] = 0;
                    for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].sub_questions.length; l++) {
                      if (!isNaN(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score'])) {
                        score = this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score'];
                      } else {
                        score = 0;
                      }
                      this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'] += score;
                    }
                    this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'] = parseFloat(this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'].toFixed(2));
                    // calc formula
                    if (this.evaluate_form[i].subtype[j].questions[k].choice_list) {
                      for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].choice_list.properties.length; l++) {
                        if (this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'] <= this.evaluate_form[i].subtype[j].questions[k].choice_list.properties[l].score) {
                          this.evaluate_form[i].subtype[j].questions[k]['gain_level'] = this.evaluate_form[i].subtype[j].questions[k].choice_list.properties[l].score;
                          this.evaluate_form[i].subtype[j].questions[k]['gain_score'] = (parseFloat(this.evaluate_form[i].subtype[j].questions[k]['gain_level']) * this.evaluate_form[i].subtype[j].questions[k].choice_list.weight) / this.evaluate_form[i].subtype[j].questions[k].choice_list.max_score;
                          // console.log(this.evaluate_form[i].subtype[j].questions[k]);
                          console.log(this.evaluate_form[i]['gain_score']);
                          break;
                        } else {
                          this.evaluate_form[i].subtype[j].questions[k]['gain_score'] = this.evaluate_form[i].subtype[j].questions[k].choice_list.weight;
                        }
                      }
                    } 
                  }
                }  
              }
            }
          }
        }
        this.calcSumEvaluateFormScore();
      } else if (subtype.formula == 'calc_by_question_score') {
        question['gain_score'] = choice.score;
        this.calcSumEvaluateFormScore();
      }

    }

  }

  calcSumEvaluateFormScore() {
    var score = 0;
    for (var i = 0; i < this.evaluate_form.length; i++) {
      // if(this.evaluate_form[i].id == this.step_type){
      if (this.evaluate_form[i].formula == 'calc_avg_all') {
        this.evaluate_form[i]['gain_score'] = 0;
        if (this.evaluate_form[i].subtype != undefined) {
          for (var j = 0; j < this.evaluate_form[i].subtype.length; j++) {
            for (var k = 0; k < this.evaluate_form[i].subtype[j].questions.length; k++) {
              if (!isNaN(this.evaluate_form[i].subtype[j].questions[k]['gain_score'])) {
                score = parseFloat(this.evaluate_form[i].subtype[j].questions[k]['gain_score']);
              } else {
                score = 0;
              }
              this.evaluate_form[i]['gain_score'] += score;
            }  
          }
        }
      } else if (this.evaluate_form[i].formula == 'calc_sum_subtype') {
        this.evaluate_form[i]['gain_score'] = 0;
        var subtype_score = 0;
        for (var j = 0; j < this.evaluate_form[i].subtype.length; j++) {
          subtype_score = 0;
          // level 1
          for (var k = 0; k < this.evaluate_form[i].subtype[j].questions.length; k++) {
            if (this.evaluate_form[i].subtype[j].questions[k].sub_questions && this.evaluate_form[i].subtype[j].questions[k].formula == null) {
              // level 2
              for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].sub_questions.length; l++) {
                if (this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions) {
                  // level 3
                  for (var m = 0;m < this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions.length; m++) {
                    if (!isNaN(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions[m]['gain_score'])) {
                      subtype_score += parseFloat(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions[m]['gain_score']);
                    }
                  }
                } else if (!isNaN(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score'])) {
                  subtype_score += parseFloat(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score']);
                }
              }
            } else if (!isNaN(this.evaluate_form[i].subtype[j].questions[k]['gain_score'])) {
              subtype_score += parseFloat(this.evaluate_form[i].subtype[j].questions[k]['gain_score']);
            }
          }
          if (subtype_score > this.evaluate_form[i].subtype[j].max_score) {
            subtype_score = this.evaluate_form[i].subtype[j].max_score;
          }
          this.evaluate_form[i]['gain_score'] += subtype_score;
        }
      }
    }
  }

}
