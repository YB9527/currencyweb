<template>
	<div   >
    <div  v-if="column.type === 'slot'" >
      <slot :data="data" :modulerow="column"  ></slot>
      <div class="danger">{{column.error}}</div>
    </div>
    <div  :class="column.class?column.class:'row'" v-else >
      <div class="formitemlabel"  :class="column.labelclass" v-if="column.text">
          {{column.text}}
      </div>
      <div class="formitemvalue" :class="column.valueclass">
        <div class="value" >
          <div v-if="!column.type || column.type === 'text'" @click="column.click? column.click({field:column.prop, val: data}) : ()=>{}" :class="column.class">
          {{ ((column.prop&&data[column.prop]) || column.text ) | textfileter(column.optionmap) }}
          </div>
          <el-input @blur="childCheck(column)"  v-else-if="column.type === 'input'" v-model="data[column.prop]" :placeholder="column.placeholder"></el-input>
          <el-input @blur="childCheck(column)" v-else-if="column.type === 'area'" type="textarea" :autosize="true" v-model="data[column.prop]" :placeholder="column.placeholder"></el-input>
          <el-select @change="childCheck(column)" v-else-if="column.type === 'select'"  v-model="data[column.prop]" :placeholder="column.placeholder" clearable >
              <el-option
                v-for="item in column.options"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>

          	<el-radio-group @change="childCheck(column)" v-else-if="column.type === 'radio'"  v-model="data[column.prop]">
          		<el-radio :label="item.key" v-for="item in column.options" :key="item.id">{{item.value}}</el-radio>
          	</el-radio-group>

          	<el-date-picker
              @change="childCheck(column)"
          		v-else-if="column.type === 'date'"
          		v-model="data[column.prop]"
          		type="date"
          		:placeholder="column.placeholder">
          	</el-date-picker>
          	  <el-date-picker
                  @change="childCheck(column)"
          	      	v-model="data[column.prop]"
          	       v-else-if="column.type === 'data'"
          	       :placeholder="column.placeholder">
          	     </el-date-picker>
          	 <div
          			class="intrange"
          			v-else-if="column.type === 'daterange'" >
          		 <div class="inputstart">
          			<el-date-picker
                  @change="childCheck(column)"
          			      v-model="data[column.prop][0]"
          			      type="date"
          			      placeholder="选择日期"
          				   value-format="yyyy-MM-dd">
          			    </el-date-picker>
          		 </div>
          		 <div>
          			 -
          		 </div>
          		 <div  class="inputend">
          			 <el-date-picker
                        @change="childCheck(column)"
          			       v-model="data[column.prop][1]"
          			       type="date"
          			       placeholder="选择日期"
          				    value-format="yyyy-MM-dd">
          			     </el-date-picker>
          		 </div>
          	 </div>

             <div
          		class="intrange"
          		v-else-if="column.type === 'intrange'" >
          	 <div class="inputstart">
          		<el-input   v-model="data[column.prop][0]" :placeholder="column.placeholder&&column.placeholder.length>0 && column.placeholder[0]"></el-input>
          	 </div>
          	 <div>
          		 -
          	 </div>
          	 <div  class="inputend">
          		 <el-input   v-model="data[column.prop][1]" :placeholder="column.placeholder&&column.placeholder.length>1 && column.placeholder[1]"></el-input>
          	 </div>
             </div>
        </div>
        <div class="danger">{{column.error}}</div>
      </div>
    </div>
	</div>
</template>

<script>
	export default{
		props:{
			data:{type:Object},
      rowcount:{
        type:Number,
        default:1
      },
			column:{
				type:Object,
				default:{
					type:"",
					prop:"",
					placeholder:"",
					options:[],
				}
			}
		},
		filters:{
			textfileter(text,optionmap,column){

				if(optionmap && optionmap[text]){

					return optionmap[text]
				}
				return text;
			}
		},
    created(){

    },
    methods:{

      childCheck(item){
        console.log(3);
      	let data = this.data;
      	let error="";
      	if(item.check && item.prop){
      		if(item.check instanceof Array){
      			error  = item.check[0](this.data[item.prop],item.check[1]);
      		}else{
      			error  = item.check(this.data[item.prop]);
      		}
      	}
      	item.error = error;
      	return error;
      }
    }
	}
</script>

<style scoped>
  .row{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .formitemlabel{
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
	.intrange{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.inputstart,.inputend{
		width: calc(50% - 10px);

	}
	.label {
		text-align: center;
		color: #999999;
		font-size: 18px;
	}

	.el-row {
	  display: flex;
	  align-items: center;
	}
	.el-select {
	    width: 100%;
	}
	.el-date-editor {
	    width: 100%;
	}
	.pointer {
		cursor: pointer;
		color: #3a8ee6;
	}

</style>
