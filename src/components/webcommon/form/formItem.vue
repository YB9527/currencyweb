<template>
  <div class="foritemvue" style="height: 100%;width: 100%;">
    <div v-if="column.type === 'slot'">
      <slot :data="data" :modulerow="column"></slot>
      <div class="danger">{{ column.error }}</div>
    </div>

    <div :class="column.class?column.class:'row'" v-else>
      <div class="formitemlabel" :class="column.labelclass" v-if="column.text">
        {{ column.text }}
      </div>
      <div class="formitemvalue" :class="column.valueclass">
        <div class="value">
          <!-- {{column.type}} -->
          <div class="textvalue" v-if="!column.type || column.type === 'text'"
               @click="column.click? column.click({field:column.prop, val: data}) : ()=>{}" :class="column.class">
            <span>{{ ((column.prop && data[column.prop])) | textfileter(column.optionmap) }}</span>
          </div>
          <el-input @blur="childCheck(column)" v-else-if="column.type === 'input'" v-model="data[column.prop]"
                    :placeholder="column.placeholder"></el-input>
          <el-input @blur="childCheck(column)" v-else-if="column.type === 'textarea'"
                    type="textarea" v-model="data[column.prop]"
                    :placeholder="column.placeholder"
                    :autosize="column.autosize" show-word-limit></el-input>
          <el-select @change="childCheck(column)" v-else-if="column.type === 'select'" v-model="data[column.prop]"
                     :placeholder="column.placeholder" clearable>
            <el-option
              v-for="item in column.options"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>

          <el-cascader
            v-else-if="column.type === 'cascader'"
            :options="column.options"
            :props="{value:'key',label:'value' }"
            v-model="data[column.prop]"
            @change="cascaderChange($event,data,column.prop)"
            clearable>
          </el-cascader>


          <el-radio-group @change="childCheck(column)" v-else-if="column.type === 'radio'" v-model="data[column.prop]">
            <el-radio v-for="option in column.options" :key="option.key" :label="option.key">{{ option.value }}
            </el-radio>
          </el-radio-group>
          <!-- <view v-else-if="column.type === 'checkbox'">
            11
          </view> -->
          <el-checkbox-group v-else-if="column.type === 'checkbox'" v-model="data[column.prop]">
            <el-checkbox
              v-for="option in column.options"
              :key="option.key"
              :label="option.key"
            >{{ option.value }}
            </el-checkbox>
          </el-checkbox-group>
          <!-- button 显示选中的 checkbox -->
          <div class="previewcheckbox"
               v-else-if="column.type === 'previewcheckbox' && data[column.prop] instanceof Array">
            <div v-for="option in column.options" :key="option.key"
                 v-if="data[column.prop].indexOf(option.key) !== -1">
              <el-tag style="margin-right:10px;">{{ option.value }}</el-tag>
            </div>
          </div>
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
            v-else-if="column.type === 'daterange'">
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
            <div class="inputend">
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
            v-else-if="column.type === 'intrange'">
            <div class="inputstart">
              <el-input v-model="data[column.prop][0]"
                        :placeholder="column.placeholder&&column.placeholder.length>0 && column.placeholder[0]"></el-input>
            </div>
            <div>
              -
            </div>
            <div class="inputend">
              <el-input v-model="data[column.prop][1]"
                        :placeholder="column.placeholder&&column.placeholder.length>1 && column.placeholder[1]"></el-input>
            </div>
          </div>
          <div v-else-if="column.type === 'fj'">
            <webUploadFile :elupload="column.upload" :idname="column.name"></webUploadFile>
          </div>
        </div>
        <div class="danger">{{ column.error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import webUploadFile from '../web-upload-file.vue'

export default {
  props: {
    data: {type: Object},
    rowcount: {
      type: Number,
      default: 1
    },
    column: {
      type: Object,
      default: {
        type: "",
        prop: "",
        placeholder: "",
        options: [],
      }
    }
  },
  components: {webUploadFile},
  filters: {
    textfileter(text, optionmap, column) {

      if (optionmap && optionmap[text]) {

        return optionmap[text]
      }
      return text;
    }
  },

  created() {

  },
  methods: {

    childCheck(item) {
      //console.log(3);
      let data = this.data;
      let error = "";
      if (item.check && item.prop) {
        if (item.check instanceof Array) {
          error = item.check[0](this.data[item.prop], item.check[1]);
        } else {
          error = item.check(this.data[item.prop]);
        }
      }
      item.error = error;
      return error;
    },
    cascaderChange(value, data, prop) {
      if (value && value.length > 0) {
        data[prop] = value[value.length - 1];
      } else {
        data[prop] = null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.foritemvue {
  .row {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .toprow {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
  }

  .formitemlabel {
    width: 100px;
    text-align: right;
    padding-right: 10px;
    line-height: normal;
    color: #999;
  }

  .value {
    height: 100%;
    width: 100%;
    line-height: normal;
  }

  .textvalue {
    line-height: normal;
    display: flex;
    justify-content: flex-start;
  }

  .intrange {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inputstart, .inputend {
    width: calc(50% - 10px);

  }

  .label {
    text-align: center;
    color: #999999;
    font-size: 18px;

  }

  .el-row {
    /* display: flex; */
    align-items: left;
    font-size: 100px;
  }

  .el-select {
    width: 100%;
  }

  .el-date-editor {
    width: 100%;
  }

  .el-cascader {
    width: 100%;
  }

  .pointer {
    cursor: pointer;
    color: #3a8ee6;
  }

  .formitemvalue {
    width: calc(100% - 100px);
  }

  .previewcheckbox {
    display: flex;
    flex-wrap: wrap;

  }

  //.previewcheckboxitem {
  //  margin-right: 20px;
  //  min-width: 50px;
  //  padding: 0 10px;
  //  background-color: var(--primary);
  //  color: #FFFFFF;
  //  line-height: 20px;
  //}
}


</style>
