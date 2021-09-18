<template>
  <div class="webtablevue">
    <el-table
      :data="datas"

      highlight-current-row
      style="width: 100%; height: 100%"
      class="tables" :row-style="{ height: '35px' }"
      :cell-style="{ padding: '0px' }" border :header-row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange" @row-click="clickTable">
      <template v-for="(item, index) of columns">

        <el-table-column v-if=" item.type === 'text' " :key="index" :fixed="item.fixed" :prop="item.prop"
          :type="item.type"  :align="item.align ? item.align : 'center'" :width="item.width">
          <template  slot="header" slot-scope="scope">
               <slot name="header" :item="item">{{item.label}}</slot>
          </template>
          <!--if判断的是父组件传的表头是操作的id名   @click="item1.click(scope.row, i)"-->
          <template slot-scope="scope">
            <el-button plain v-for="(item1, i) in item.list" :key="i" @click="item1.click" type="text"
              :size="item.size || 'mini'">{{ item1.label }}</el-button>
            <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.type === 'slot'" :key="index" :fixed="item.fixed"
          :align="item.align" :width="item.width">

          <template slot="header" slot-scope="scope">
               <slot name="header" :item="item"> {{item.label}}</slot>
          </template>

          <template slot-scope="scope">
             <slot name="item" :scope="scope" :item="item"></slot>
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.type === 'select'" :key="index" :fixed="item.fixed" :label="item.label"
          :align="item.align" :width="item.width">
          <template slot="header" slot-scope="scope">
               <slot name="header" :item="item"> {{item.label}}</slot>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row[item.prop]"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.type === 'selection'" :key="index" :fixed="item.fixed" :prop="item.prop"
          type="selection" :label="item.label" :align="item.align" :width="item.width">
        </el-table-column>

        <el-table-column v-else-if="item.type === 'button'" :key="index" :fixed="item.fixed" :prop="item.prop"
          :label="item.label" :align="item.align ? item.align : 'center'" :width="item.width">
         <template slot="header" slot-scope="scope">
              <slot name="header" :item="item"> {{item.label}}</slot>
         </template>
          <!--if判断的是父组件传的表头是操作的id名-->
          <template slot-scope="scope" style="text-align: right">
            <!-- <el-button-group> -->
            <el-button plain v-for="(item2, i) in item.list" :key="i" @click="item2.click(scope.$index, scope.row)"
              :size="item.size || 'mini'" :type="item2.type" v-show="
                    item2.show ? item2.show(scope.$index, scope.row) : true
                  ">{{ item2.label }}</el-button>
            <!-- </el-button-group> -->

            <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.type === 'index'" :label="item.label" :type="item.type" :key="index"
          :width="item.width">
          <template slot-scope="scope">
            {{
                scope.$index + 1 + pagesize * (currentpage - 1)
              }}
          </template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :key="index" :fixed="item.fixed" :prop="item.prop"
          :align="item.align ? item.align : 'center'" :width="item.width" :type="item.type">
          <template slot="header" slot-scope="scope">
               <slot name="header" :item="item"> {{item.label}}</slot>
          </template>
          <template slot-scope="scope">
            {{
                item.formatter
                  ? item.formatter(scope.row[item.prop])
                  : scope.row[item.prop]
              }}
            <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
          </template>
        </el-table-column>
        <!--可以传align,width和type来控制表格的居中，宽度和类型（比如需要序号，type传index）-->
      </template>
    </el-table>
    <el-pagination :page-sizes="pagesizes" layout="total,sizes, prev, pager, next,jumper"
      v-show="total > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentpage" :page-size.sync="pagesize" :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      datas: {
        // 表格数据源 默认为空数组
        type: Array,
        default: () =>
          [
            {id:"1",label:"aaa",des:"道可道非常道"},
            {id:"2",label:"aaa",des:"道可道非常道"},
            {id:"3",label:"aaa",des:"道可道非常道"},
            {id:"4",label:"aaa",des:"道可道非常道"},
            {id:"5",label:"aaa",des:"道可道非常道"},
          ]
        ,
      },
      columns: {
        // 表格的字段展示 默认为空数组
        type: Array,
        default: ()=>
           [
            {label:"序号",type:"index",width:200},
            {label:"ID",prop:"id",width:200},
            {label:"名字",prop:"label",width:200},
            {label:"描述",prop:"des"}
          ]
        ,
      },
      total:{
        type:Number,
        default:-1,
      },
      event:{
        type:Object,
        default:()=>{
          return {
            handleCurrentChange: (index,callback) => {},
            pageSizeChange:(size,callback)=>{},
          }
        }
      },
      pagesizes: {
        type: Array,
        default: () => [5,10, 15, 20, 50],
      },
    },
    data() {
      return {
        currentpage: 1,
        pagesize:this.pagesizes[2],
      }
    },
    methods: {

      // 正常
      handleSelectionChange(val) {
        this.$emit("handleSelectionChange", {
          val: val
        });
      },
      // 正常
      clickTable(row, column, event) {
        let index;
        for (var i = 0; i < this.datas.length; i++) {
          if (row === this.datas[i]) {
            index = i;
          }
        }
        this.event.itemClick && this.event.itemClick(index, row);
      },
      // 正常
      handleEdit(index, row) {
        this.$emit("handleEdit", {
          index: index,
          row: row
        });
      },
      // 正常
      handleDelete(index, row) {
        this.$emit("handleDelete", {
          index: index,
          row: row
        });
      },
      handleSizeChange(val) {

        this.event.handleSizeChange
          && this.event.handleSizeChange(val,this.reFushData);
      },
      handleCurrentChange(val) {
         this.event.handleCurrentChange && this.event.handleCurrentChange(val,this.reFushData);
      },
      /**刷新数据
       * @param {Object} datas
       */
      reFushData(datas){
        this.$Tool.arrayReplace(this.datas,datas);
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        /* console.log(row, rowIndex);
          if (rowIndex === 0) {
            return "warning-row";
          } else if (rowIndex === 1) {
            return "warning-row";
          }
          return "";*/
      },
    },
  };
</script>
<style lang="scss">

  .webtablevue {
     height:100%;
     width:100%;
    ::v-deep.el-table th,
    .el-table tr {
      background: var(--main_background_color) !important;
      color: var(--main_color);
    }
  }
</style>
