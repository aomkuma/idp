import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  @ViewChild('modalSuccessData')  modalSuccessData: ElementRef;
  @ViewChild('modalWarnSaveDraft')  modalWarnSaveDraft: ElementRef;
  @ViewChild('modalConfirmSave')  modalConfirmSave: ElementRef;
  closeModal : string;
  
  storage_url : any = environment.fileUrl;
  submitted : any = false;
  error_message : any;
  id : any;
  evaluate_form_id : any;
  evaluate_round_id : any;
  evaluate_round : any ={fiscal_year : ''};
  idp_list : any = {'data' : null};
  user_data :any;
  evaluate_data : any;
  salary_data : any = {'old_salary' :null, 'percent' :null, 'salary' :null};
  evaluate_form : any;
  answer_list : any = [];
  step_type = 1;
  step_subtype = 1;
  prepare_stop = false;
  is_lastpage = false;
  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute, 
              private httpService: HttpServiceService,
              private uploadService: UploadServiceService,
              private tokenStorage: TokenStorageService,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.user_data = this.tokenStorage.getUser().user;
    // this.user_data.position = 'อาาจารย์เน้นวิจัย';
    this.getIdpDataByUser();
    this.getEvaluateForm();
  }

  onFileChange(event, model) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      for (var i = 0; i < this.answer_list.length; i++) {    
        if (this.answer_list[i]['question_id'] == model.id) {
          this.answer_list[i]['file_source'] = file;
          this.answer_list[i]['user_file'] = model.user_file;
          this.answer_list[i]['is_change'] = true;
          
        }
      }
      console.log(this.answer_list);
    }
  }

  getIdpDataByUser(){
      this.httpService.callHTTPGet('idp/by-user/', this.user_data.id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          if (event.body['evaluate_round']) {
            this.evaluate_round = event.body['evaluate_round'];
          }
          if (event.body['master_idp_list']) {
            this.idp_list = event.body['master_idp_list'];
          }
        }
        
      },
      err => {
      });
  }

  getEvaluateForm() {
      this.httpService.callHTTPGet('evaluate/form/', this.user_data.id + '/' + this.user_data.personnel_type).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          if (event.body['salary_data']) {
            this.salary_data = event.body['salary_data'];
          }
          this.evaluate_data = event.body['evaluate_data'];
          this.evaluate_form = event.body['data'];
          this.evaluate_form_id = event.body['evaluate_form_id'];
          this.evaluate_round_id = event.body['evaluate_round_id'];
          this.step_type = this.evaluate_form[0].id;
          this.step_subtype = this.evaluate_form[0].subtype[0].page;
          this.answer_list = event.body['answer_list'];
          for (var i = 0; i < this.evaluate_form.length; i++) {
            for (var j = 0; j < this.evaluate_form[i].subtype.length; j++) {
              // for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].sub_questions.length; l++) {
              //   if (this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions) {
              //     for (var m = 0;m < this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions.length; m++) {
              //       this.calcScore(this.evaluate_form[i], this.evaluate_form[i].subtype[j], this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions[m].question, this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions[m].question.choice_list.properties);
              //     }
              //   }
              // }
            }
          }
          // this.calcSumEvaluateFormScore();
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
    console.log(question);
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
          // sum_max_score += subtype.questions[i].choice_list.properties[size_of_choice].score;
          sum_max_score += subtype.questions[i].choice_list.max_score;
        }
        console.log(choice.score + ' * ' + max_subtype_score + ' / ' + sum_max_score);
        sum = (choice.score * max_subtype_score) / sum_max_score;
        question['gain_score'] = parseFloat(sum+'').toFixed(2);
        this.calcSumEvaluateFormScore();
      } else if (subtype.formula == 'calc_by_question_weight') {
        question['selected_choice'] = choice;
        if (!question.has_user_input) {
          sum = (choice.score * question.choice_list.weight) / question.choice_list.max_score;
          question['gain_score'] = sum;
        } else {
          if (question['user_input'] == null) {
            question['user_input'] = 0;
          }
          // console.log(choice);
          sum = (choice.score * question['user_input']) / question.choice_list.max_score;
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
                    this.evaluate_form[i].subtype[j].questions[k]['gain_level'] = 0;
                    this.evaluate_form[i].subtype[j].questions[k]['gain_score'] = 0;
                    for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].sub_questions.length; l++) {
                      if (!isNaN(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score'])) {
                        score = parseFloat(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score']);
                      }
                      if (isNaN(score)) {
                        score = 0;
                      }
                      console.log(score);
                      this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'] += score;
                    }
                    
                    this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'] = parseFloat(this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score'].toFixed(2));
                    
                    // calc formula
                    if (this.evaluate_form[i].subtype[j].questions[k].choice_list) {
                      for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].choice_list.properties.length; l++) {
                        console.log(this.evaluate_form[i].subtype[j].questions[k]['gain_sub_score']);
                        console.log(this.evaluate_form[i].subtype[j].questions[k]['gain_level']);
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
        question['gain_score'] = parseFloat(choice.score);
        sum = parseFloat(choice.score);
        console.log('calc_by_question_score : ' + choice.score);
        this.calcSumEvaluateFormScore();
      }

    }

    var is_answered = false;
    for (var i = 0; i < this.answer_list.length; i++) {    
      if (this.answer_list[i]['question_id'] == question.id) {
        this.answer_list[i] = {'answer_id' : null, 'user_id' : this.user_data.id, 'evaluate_form_id' : this.evaluate_form_id, 'question_id' : question.id, 'answer' : choice.choice, 'score' : sum, 'is_change' : true, 'user_remark' : question.user_remark, 'user_input' : question.user_input};
        if (question.user_answer_data) {
          this.answer_list[i].answer_id = question.user_answer_data.id;
        }
        is_answered = true;
      }
    }

    if (!is_answered) {
      this.answer_list.push({'answer_id' : null, 'user_id' : this.user_data.id, 'evaluate_form_id' : this.evaluate_form_id, 'question_id' : question.id, 'answer' : choice.choice, 'score' : sum, 'is_change' : true, 'user_remark' : question.user_remark, 'user_input' : question.user_input});
    }
  }

  updateAnswer(question) {
    var is_answered = false;
    for (var i = 0; i < this.answer_list.length; i++) {    
      if (this.answer_list[i]['question_id'] == question.id) {
        // this.answer_list[i] = {'answer_id' : null, 'user_id' : this.user_data.id, 'evaluate_form_id' : this.evaluate_form_id, 'question_id' : question.id, 'answer' : choice.choice, 'score' : sum, 'is_change' : true, 'user_remark' : question.user_remark};
        if (question.user_answer_data) {
          this.answer_list[i].answer_id = question.user_answer_data.id;
          
        }
        this.answer_list[i].user_remark = question.user_remark;
          this.answer_list[i].user_input = question.user_input;
        is_answered = true;
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
              if ((this.evaluate_form[i].subtype[j].questions[k]['gain_score']) != null) {
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
          console.log('sub type name : ' + this.evaluate_form[i].subtype[j].evaluate_subtype);
          subtype_score = 0;
          // level 1
          for (var k = 0; k < this.evaluate_form[i].subtype[j].questions.length; k++) {
            if (this.evaluate_form[i].subtype[j].questions[k].sub_questions && this.evaluate_form[i].subtype[j].questions[k].formula == null) {
              // level 2
              for (var l = 0; l < this.evaluate_form[i].subtype[j].questions[k].sub_questions.length; l++) {
                if (this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions) {
                  // level 3
                  for (var m = 0;m < this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions.length; m++) {
                    if ((this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions[m]['gain_score']) != null) {
                      subtype_score += parseFloat(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l].sub_questions[m]['gain_score']);
                    }
                  }
                } else if ((this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score']) != null) {
                  subtype_score += parseFloat(this.evaluate_form[i].subtype[j].questions[k].sub_questions[l]['gain_score']);
                }
              }
            } else if ((this.evaluate_form[i].subtype[j].questions[k]['gain_score']) != null) {
              subtype_score += parseFloat(this.evaluate_form[i].subtype[j].questions[k]['gain_score']);
            }
          }
          if (subtype_score > this.evaluate_form[i].subtype[j].max_score) {
            subtype_score = this.evaluate_form[i].subtype[j].max_score;
          } else if (this.evaluate_form[i].subtype[j].min_score && subtype_score < this.evaluate_form[i].subtype[j].min_score) {
            subtype_score = this.evaluate_form[i].subtype[j].min_score;
            console.log('min_score : ' + this.evaluate_form[i].subtype[j].min_score);
          }
          console.log('sub type total score : ' +subtype_score);

          this.evaluate_form[i]['gain_score'] += subtype_score;
        }
      }
    }
  }

  saveDraft () {

    this.submitted = true;
    const formData: FormData = new FormData();
    formData.append('user_id', this.user_data.id);
    formData.append('personnel_type', this.user_data.personnel_type);
    formData.append('evaluate_form_id', this.evaluate_form_id);
    formData.append('evaluate_round_id', this.evaluate_round_id);
    formData.append('evaluate_status', '1');

    for (var i = 0; i < this.answer_list.length; i++) {
      formData.append('is_change[]', this.answer_list[i].is_change);
      formData.append('answer_id[]', this.answer_list[i].answer_id);
      formData.append('question_id[]', this.answer_list[i].question_id);
      formData.append('answer[]', this.answer_list[i].answer);
      formData.append('score[]', this.answer_list[i].score);
      formData.append('user_remark[]', this.answer_list[i].user_remark);
      formData.append('user_input[]', this.answer_list[i].user_input);
      formData.append('user_file[]', this.answer_list[i].user_file?this.answer_list[i].user_file:'');
      formData.append('file_source[]', this.answer_list[i].file_source);
    }

    this.uploadService.uploadFile('evaluate-form/update/draft', formData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          // console.log(event['body']['id']);
          this.evaluate_form = event.body['data'];
          this.evaluate_form_id = event.body['evaluate_form_id'];
          this.evaluate_round_id = event.body['evaluate_round_id']; 
          this.answer_list = event.body['answer_list'];         
          this.evaluate_data = event.body['evaluate_data'];
          this.submitted = false;
          this.calcSumEvaluateFormScore();
          
        }
        
      },
      err => {
        this.error_message = err.error.message;
        this.submitted = false;
      }
    );
    
  }

  saveConfirm () {

    if (!this.evaluate_form_id) {
      this.modalService.open(this.modalWarnSaveDraft, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
        console.log(res);
        if(res == 'Confirm'){
          // this.router.navigate(['/dashboard']);
        }
        
      }, (res) => {
        
      });
      return false;
    } else {
      this.modalService.open(this.modalConfirmSave, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
        console.log(res);
        if(res == 'Confirm'){
          this.submitted = true;
          const formData: FormData = new FormData();
          formData.append('user_id', this.user_data.id);
          formData.append('personnel_type', this.user_data.personnel_type);
          formData.append('evaluate_form_id', this.evaluate_form_id);
          formData.append('evaluate_round_id', this.evaluate_round_id);
          formData.append('evaluate_status', '1');

          for (var i = 0; i < this.answer_list.length; i++) {
            formData.append('is_change[]', this.answer_list[i].is_change);
            formData.append('answer_id[]', this.answer_list[i].answer_id);
            formData.append('question_id[]', this.answer_list[i].question_id);
            formData.append('answer[]', this.answer_list[i].answer);
            formData.append('score[]', this.answer_list[i].score);
            formData.append('user_remark[]', this.answer_list[i].user_remark);
            formData.append('user_input[]', this.answer_list[i].user_input);
            formData.append('user_file[]', this.answer_list[i].user_file?this.answer_list[i].user_file:'');
            formData.append('file_source[]', this.answer_list[i].file_source);
          }

          this.uploadService.uploadFile('evaluate-form/update/complete', formData).subscribe(
            event => {
              if (event instanceof HttpResponse) {
                this.modalService.open(this.modalSuccessData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
                  this.closeModal = `Closed with: ${res}`;
                  console.log(res);
                  if(res == 'Confirm'){
                    this.router.navigate(['/dashboard']);
                  }
                  
                }, (res) => {
                  
                });
              }
              
            },
            err => {
              this.error_message = err.error.message;
              this.submitted = false;
            }
          );
        }
        
      }, (res) => {
        
      });
    }
  }

}
