<template>
  <div>
    <el-row>
      <el-col :span="2" :offset="0">
            <el-popover
            placement="top-start"
            title="权重和阈值说明"
            width="200"
            trigger="hover"
            >
            <div>
            <p>神器权重计算方式与符文不同,值为权重*值/最大值</p><br>    
            <p>单项阈值为单纯值,评分阈值为通过权重计算后的得分</p><br>     
            <p>评分阈值是固定值，评分百分比动态比例的阈值</p><br>  
            </div>
            <el-button slot="reference">权重和阈值说明</el-button>
        </el-popover>
        </el-col>
        <el-col :span="2" :offset="0">
            <el-popover
            placement="top-start"
            title="使用说明"
            width="200"
            trigger="hover"
            >
            <div>
            <p>使用时请选择按强化度排序</p><br>         
            </div>
            <el-button slot="reference">使用说明</el-button>
        </el-popover>
        </el-col>
       
      <el-col :span="16" :offset="0">
        <el-tooltip
          class="item"
          effect="dark"
          content="各类非针对属性权重设置,用于计算神器评分"
          placement="top-start"
        >
          <el-button
            type="info"
            size="small"
            icon="el-icon-setting"
            @click="dialogWeightSettingVisible = true"
            >非属性权重设置</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="属性增伤减伤权重设置,用于计算神器评分"
          placement="top-start"
        >
          <el-button
            type="info"
            size="small"
            icon="el-icon-setting"
            @click="dialogWeightSettingVisible2 = true"
            >属性权重设置</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="各阈值设置,即大于等于该值时,认为是有价值的神器,评分阈值默认为+12神器"
          placement="top-start"
        >
          <el-button
            type="info"
            size="small"
            style="margin-left: 10px"
            icon="el-icon-setting"
            @click="dialogThresholdSettingVisible = true"
            >阈值设置</el-button
          >
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="单项属性最大值的百分比阈值,如果手动设置过阈值则会使用设置后的阈值" placement="top-start">
            <div style="display: inline;">
            <label>简易单项阈值倍率:</label>
            <el-input placeholder="简易单项阈值倍率" v-model="maxpercent"  style="width:60px" @change="saveMaxpercent"></el-input>
          </div>
        </el-tooltip>
        
        <el-tooltip class="item" effect="dark" content="表示使用评分阈值还是各评分百分比筛选" placement="top-start">
            <el-switch
            class="compute-switch"
            v-model="computeFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="评分百分比"
            inactive-text="评分阈值">
            </el-switch>
          </el-tooltip> 
          <el-tooltip v-if="computeFlag" class="item" effect="dark" content="筛选掉各项评分从低到高'倍率'的神器,各项评分单独计算,小于9的不计算在内" placement="top-start">
            <div style="display: inline;">
            <label>评分阈值倍率:</label>
            <el-input placeholder="评分阈值倍率" v-model="simplePercent"  style="width:60px" @change="saveSimplePercent"></el-input>
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="针对百分比筛选时的强化程度，默认小于9不生效,最好配合下方表格中的等级筛选使用" placement="top-start">
          <div style="display: inline;">
            <label>强化程度:</label>
            <el-select v-model="addValue" placeholder="请选择" style="width:130px">
              <el-option
                v-for="item in addOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
          </el-tooltip>
        
      </el-col>
      <!-- <el-col :span="4" :offset="0">
        

      </el-col> -->
      
      <el-col :span="4">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="alert"
          :show-file-list="false"
          :file-list="fileList"
          :multiple="false"
          :auto-upload="false"
          :on-change="loadJsonFromFile"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            上传通过代理获得的json文件
          </div>
          <el-button size="small" @click="submit" style="margin-left: 10px"
            >开始评估</el-button
          >
        </el-upload>
      </el-col>
    </el-row>
    <el-row v-if="scoreThrs['global'] && computeFlag">
      <el-col :span="8" :offset="0"></el-col>
      <span> 当前分数阈值 </span>
      <span style="margin-left:5px">总分:{{scoreThrs['global']}}</span>
      <span style="margin-left:5px">追伤分:{{scoreThrs['onlyAddDamage']}}</span>
      <span style="margin-left:5px">治疗分:{{scoreThrs['treatment']}}</span>
      <span style="margin-left:5px">增伤分:{{scoreThrs['attact']}}</span>
      <span style="margin-left:5px">减伤分:{{scoreThrs['tank']}}</span>
      <span style="margin-left:5px">控制分:{{scoreThrs['control']}}</span>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="displayTableData"
          style="width: 100%"
          :cell-style="singleThresholdClass"
          :row-class-name="tableRowClassName"
          height="630"
        >
          <el-table-column
            prop="id"
            label="id"
            width="110"
            align="center"
            v-if="false"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="神器类型"
            width="60"
            align="center"
            :filters="[
              { text: '属性神器', value: 1 },
              { text: '类型神器', value: 2 },
            ]"
            :filter-method="filterTypeHandler"
            :formatter="typeNameFormatter"
          >
          </el-table-column>
          <el-table-column
            prop="mainAttr"
            label="主属性"
            width="100"
            :formatter="mainAttrFormatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="realStyle"
            label="属性类型"
            width="62"
            align="center"
            :filters="[
              { text: '水属性', value: 1 },
              { text: '火属性', value: 2 },
              { text: '风属性', value: 3 },
              { text: '光属性', value: 4 },
              { text: '暗属性', value: 5 },
              { text: '攻击型', value: 11 },
              { text: '防御型', value: 12 },
              { text: '体力型', value: 13 },
              { text: '辅助型', value: 14 },
            ]"
            :filter-method="filterRealStyleHandler"
            :formatter="mainRealStyleFormatter"
          >
          </el-table-column>

          <el-table-column
            prop="naturalRank"
            label="品质"
            width="78"
            :filters="[
              { text: '普通', value: 1 },
              { text: '魔法', value: 2 },
              { text: '稀有', value: 3 },
              { text: '英雄', value: 4 },
              { text: '传说', value: 5 },
            ]"
            :filter-method="filterNaturalRankHandler"
            :formatter="naturalRankFormatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="level"
            label="等级"
            width="60"
            :filters="[
              { text: '大于等于12', value: 12 },
              { text: '大于等于9小于12', value: 9 },
            ]"
            :filter-method="filterLevelHandler"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="subAttr1"
            label="副属性1"
            width="180"
            :formatter="subAttr1Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr2"
            label="副属性2"
            width="180"
            :formatter="subAttr2Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr3"
            label="副属性3"
            width="180"
            :formatter="subAttr3Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr4"
            label="副属性4"
            width="180"
            :formatter="subAttr4Formatter"
            align="center"
          >
          </el-table-column>
          
          <el-table-column
            prop="scoresMap.global"
            label="总评分"
            width="60"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="所有属性乘权重后相加"
                placement="top"
              >
                <span></span>
                <i class="el-icon-question">总评分</i>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="scoresMap.onlyAddDamage"
            label="追伤分"
            width="80"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="仅计算追伤相关属性，可在权重设置中设置"
                placement="top"
              >
                <span></span>
                <i class="el-icon-question">追伤评分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="scoresMap.treatment"
            label="治疗分"
            width="80"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="治疗相关属性,可在权重设置中设置"
                placement="top"
              >
                <span></span>
                <i class="el-icon-question">治疗分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="scoresMap.tank"
            label="减伤分"
            width="80"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="减伤相关属性,可在权重设置中设置"
                placement="top"
              >
                <span></span>
                <i class="el-icon-question">减伤分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="scoresMap.attact"
            label="增伤分"
            width="80"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="增伤相关属性,可在权重设置中设置"
                placement="top"
              >
                <span></span>
                <i class="el-icon-question">增伤分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="scoresMap.control"
            label="控制分"
            width="80"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="控制相关属性,可在权重设置中设置"
                placement="top"
              >
                <span></span>
                <i class="el-icon-question">控制分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="advise" label="建议" width="50" align="center">
          </el-table-column>

          <el-table-column
            prop="isBelong"
            label="佩戴"
            width="60"
            :formatter="isBelongFormatter"
            :filters="[
              { text: '是', value: true },
              { text: '否', value: false },
            ]"
            :filter-method="filterIsBelonHandler"
            align="center"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="2" style="margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[200, 500, 1000, 5000]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      title="非属性权重设置"
      :visible.sync="dialogWeightSettingVisible"
      center
      width="70%"
      @open="noAttrWeightDialogOpen"
      top="5vh"
    >
      <span>评分类型:</span>
      <el-select
        v-model="currentWeightType"
        placeholder=""
        @change="noAttrWeightDialogOpen"
      >
        <el-option
          v-for="item in WeightSettingOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-divider></el-divider>
      <el-form :model="weightForm" :inline="true" style="margin-top: 10px">
        <el-form-item
          v-for="(item, key) in weightForm"
          :key="key"
          :label="item.label"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="item.value"
            autocomplete="off"
            @input="change($event)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWeightSettingVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNoAttrWeights">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="属性权重设置"
      :visible.sync="dialogWeightSettingVisible2"
      center
      width="70%"
      @open="attrWeightDialogOpen"
      top="5vh"
    >
      <!-- <span>评分类型:</span>
        <el-select v-model="currentAttrWeightType" placeholder="" @change="attrWeightDialogOpen">
          <el-option v-for="item in attrWeightSettingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
      <!-- <el-divider></el-divider> -->
      <el-form :model="attrWeightForm" :inline="true" style="margin-top: 10px">
        <div v-for="(item2, key2) in attrWeightForm" :key="key2">
          <span>属性:{{ attrNamesMap[key2] }}</span>
          <el-divider></el-divider>
          <el-form-item
            v-for="(it, k) in item2"
            :key="k"
            :label="it.label"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="it.value"
              autocomplete="off"
              @input="change($event)"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWeightSettingVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="saveAttrWeights">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="阈值设置"
      :visible.sync="dialogThresholdSettingVisible"
      center
      width="40%"
      top="5vh"
    >
      <el-form :model="thresholdForm" :inline="true" style="margin-top: 10px">
        <el-divider>单项("/"后为该值的最大值)</el-divider>
        <el-form-item
          v-for="(it, k) in thresholdForm.single"
          :key="k"
          :label="allsubs[k]+'/'+artMaxValues[k]"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="thresholdForm.single[k]"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-divider>评分</el-divider>
        <el-form-item label="总评分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.score.global"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="治疗分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.score.treatment"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="减伤分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.score.tank"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="增伤分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.score.attact"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="控制分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.score.control"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="追伤分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.score.onlyAddDamage"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogThresholdSettingVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveThresholds">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ARTIFACT } from "@/utils/constant";
import {artMax} from "@/utils/weight.js"
import {
  getArtNoAttrWeightsMap,
  getArtAttrWeightsMap,
  getOriginThresholds,
  paresAllArts,
} from "@/utils/compute";
export default {
  data() {

    let noAttrweights =
      JSON.parse(window.localStorage.getItem("artNoAttrWeights")) ||
      getArtNoAttrWeightsMap();
    let attrWeights =
      JSON.parse(window.localStorage.getItem("artAttrWeights")) ||
      getArtAttrWeightsMap();
    let maxpercent = JSON.parse(window.localStorage.getItem("artMaxpercent")) ||
      0.8
    let simplePercent = JSON.parse(window.localStorage.getItem("artSimplePercent")) ||
      0.8

    let thresholdForm =
      JSON.parse(window.localStorage.getItem("artThresholds")) ||
      getOriginThresholds(maxpercent);
    
    return {
      noAttrWeights: noAttrweights,
      attrWeights: attrWeights,
      allNoAttrSub: {},
      allAttrSub: {},
      allsubs: {},
      weightForm: {},
      formLabelWidth: "230px",
      currentWeightType: "globalArtWeights",
      WeightSettingOptions: [
        {
          value: "globalArtWeights",
          label: "总评分",
        },
        {
          value: "treatmentArtWeights",
          label: "治疗分",
        },
        {
          value: "tankArtWeights",
          label: "减伤分",
        },
        {
          value: "attactArtWeights",
          label: "输出分",
        },
        {
          value: "controlArtWeights",
          label: "控制分",
        },
        {
          value: "onlyAddDamageArtWeights",
          label: "仅追伤分",
        },
      ],
      dialogWeightSettingVisible: false,
      dialogWeightSettingVisible2: false,
      currentAttrWeightType: "add",
      attrWeightSettingOptions: [
        {
          value: "add",
          label: "增伤",
        },
        {
          value: "reduce",
          label: "减伤",
        },
      ],
      attrWeightForm: {},
      dialogThresholdSettingVisible: false,
      attrNamesMap: {},
      archeNamesMap: {},
      thresholdForm: thresholdForm,
      fileList: [],
      tableData: [],
      currentPage: 1,
      pagesize: 5000,
      total: 0,
      artMaxValues:artMax,
      maxpercent:maxpercent,
      computeFlag: true,
      simplePercent:simplePercent,
      scoreThrs:{},
      addOptions:[{
        label:'大于9小于12',
        value:0
      },{
        label:'大于12',
        value:1
      },{
        label:'大于9全部',
        value:2
      },
      ],
      addValue:1
    };
  },

  mounted() {
    this.attrNamesMap = ARTIFACT.attribute_types;
    this.archeNamesMap = ARTIFACT.arche_types;
    this.allNoAttrSub = JSON.parse(
      JSON.stringify(ARTIFACT.effectTypes.sub_lang)
    );
    this.allsubs = ARTIFACT.effectTypes.sub_lang;
    for (let i = 300; i < 310; i++) {
      if (this.allNoAttrSub[i.toString()]) {
        this.allAttrSub[i.toString()] = this.allNoAttrSub[i.toString()];
        delete this.allNoAttrSub[i.toString()];
      }
    }
  },
  methods: {
    noAttrWeightDialogOpen() {
      let cWeights = this.noAttrWeights[this.currentWeightType];
      this.weightForm = {};
      for (let i in this.allNoAttrSub) {
        let v = "";
        if (cWeights[i]) {
          v = cWeights[i];
        }
        this.weightForm[i] = { label: this.allNoAttrSub[i], value: v };
      }
    },
    attrWeightDialogOpen() {
      this.attrWeightForm = {};
      //{2:{1:{}}}
      for (let i in this.attrWeights) {
        let temp = {};
        for (let j in this.allAttrSub) {
          temp[j] = {
            label: this.allAttrSub[j],
            value: this.attrWeights[i][j] || "",
          };
        }
        this.attrWeightForm[i] = temp;
      }
    },

    saveNoAttrWeights() {
      this.noAttrWeights[this.currentWeightType] = {};
      for (let i in this.weightForm) {
        if (this.weightForm[i].value) {
          this.noAttrWeights[this.currentWeightType][i] =
            this.weightForm[i].value;
        }
      }
      window.localStorage.setItem(
        "artNoAttrWeights",
        JSON.stringify(this.noAttrWeights)
      );
      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.dialogWeightSettingVisible = false;
    },
    saveAttrWeights() {
      this.attrWeights = {};
      for (let i in this.attrWeightForm) {
        let temp = {};
        for (let j in this.attrWeightForm[i]) {
          temp[j] = this.attrWeightForm[i][j].value;
        }
        this.attrWeights[i] = temp;
      }
      window.localStorage.setItem(
        "artAttrWeights",
        JSON.stringify(this.attrWeights)
      );
      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.dialogWeightSettingVisible2 = false;
    },
    saveThresholds() {
      window.localStorage.setItem(
        "artThresholds",
        JSON.stringify(this.thresholdForm)
      );
      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.dialogThresholdSettingVisible = false;
    },
    saveMaxpercent(){
      
      window.localStorage.setItem(
        "artMaxpercent",
        JSON.stringify(this.maxpercent)
      );
      let thrs = JSON.parse(window.localStorage.getItem("artThresholds"))
      if(!thrs){
        this.thresholdForm = getOriginThresholds(this.maxpercent)
      }
      
    },
    saveSimplePercent(){
      
      window.localStorage.setItem(
        "artSimplePercent",
        JSON.stringify(this.simplePercent)
      );    
    },
    change(e) {
      this.$forceUpdate();
    },
    loadJsonFromFile(file, fileList) {
      this.fileList = fileList;
    },
    submit() {
      let file = this.fileList[0];
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        // 读取文件内容
        const dataJson = JSON.parse(e.target.result);

        this.tableData = paresAllArts(
          dataJson,
          this.noAttrWeights,
          this.attrWeights
        );
        
        let scoreArr ={}

        for (let data of this.tableData) {

          if (data.level < 9) {
            data.advise = "强化过低";
            continue
          }
          if(this.addValue==0 && data.level>=12){
            continue
          }else if(this.addValue==1 && data.level<12){
            continue
          }

          for(let m in data.scoresMap){
            
            if(!scoreArr[m]){
              scoreArr[m]= [data.scoresMap[m]]
            }else{
              scoreArr[m].push(data.scoresMap[m])
            }
          }
        }
        for(let k in scoreArr){
          let arr = scoreArr[k]
          arr.sort((d1,d2)=>{
            return d1-d2
          })
          
          this.scoreThrs[k]=arr[Math.round(this.simplePercent*arr.length)]
          
        }
        

        
        this.tableData.sort((d1, d2) => {
          let realStyle1 = d1.realStyle;
          let realStyle2 = d2.realStyle;
          //为了坑爹的火属性排在前面
          if (realStyle1 == 1) {
            realStyle1 = 2;
          } else if (realStyle1 == 2) {
            realStyle1 = 1;
          }
          if (realStyle2 == 1) {
            realStyle2 = 2;
          } else if (realStyle2 == 2) {
            realStyle2 = 1;
          }

          if (d1.type < d2.type) {
            return -1;
          } else if (d1.type == d2.type && realStyle1 < realStyle2) {
            return -1;
          } else if (
            d1.type == d2.type &&
            d1.realStyle == d2.realStyle &&
            d1.level > d2.level
          ) {
            return -1;
          } else if (
            d1.type == d2.type &&
            d1.realStyle == d2.realStyle &&
            d1.level == d2.level &&
            d1.naturalRank > d2.naturalRank
          ) {
            return -1;
          } else if (
            d1.type == d2.type &&
            d1.realStyle == d2.realStyle &&
            d1.level == d2.level &&
            d1.naturalRank == d2.naturalRank &&
            d1.rid > d2.rid
          ) {
            return -1;
          }
          return 1;
        });
        this.total = this.tableData.length;
      };
    },
    singleThresholdClass({ row, column, rowIndex, columnIndex }) {
      if (column.property == "naturalRank") {
        if (row.naturalRank == 5 || row.naturalRank == 15) {
          return "color: #FFAC52;";
        } else if (row.naturalRank == 4 || row.naturalRank == 14) {
          return "color: #F38CFF;";
        } else if (row.naturalRank == 3 || row.naturalRank == 13) {
          return "color: #52FFED;";
        } else if (row.naturalRank == 2 || row.naturalRank == 12) {
          return "color: #04D361;";
        }
      } else if (column.property.indexOf("subAttr") >= 0) {
        
        let index =
          Number(column.property.charAt(column.property.length - 1)) - 1;
        if (row.subs.length > index) {
          let key = row.subs[index].type;
          let v = row.subs[index].value;
          let name = row.subs[index].name;
          //单项阈值
          if(this.thresholdForm.single[key] && v >= this.thresholdForm.single[key]){
            if (!row.advise) {
              row.advise = "保留";
            }
            return "color: #FF4949;font-weight: 700;";
          }         
        }
      } else if (column.property.indexOf("scoresMap") > -1) {
        
        let realName = column.property.split(".")[1];
        

        let thresholds = this.thresholdForm.score
        if(this.computeFlag){
          thresholds = this.scoreThrs
        }
        let score = row.scoresMap[realName]
        if(this.addValue==0 && row.level>=12){
          if (!row.advise) {
              row.advise = "强化过高";
            }
            return 
        }else if(this.addValue==1 && row.level<12){
          if (!row.advise) {
              row.advise = "强化过低";
            }
            return
        }

        if(thresholds[realName] && score >= thresholds[realName]){
          if (!row.advise) {
              row.advise = "保留";
            }
          return "color: #FF4949;font-weight: 700;";
        }





      } else if (column.property == "scoresMap.globalWizard.score") {
        
      } else if (column.property == "advise") {
        if (!row.advise) {
          row.advise = "清理";
        } else if (row.advise == "保留") {
          return "color: #FF4949;font-weight: 700;";
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // if(row.signFlag){
      //   return 'info-row'
      // }else
      if (row.advise == "保留") {
        return "error-row";
      } else if (row.advise == "清理") {
        return "success-row";
      } else if (row.advise == "强化过低" || row.advise == "强化过高") {
        return "warning-row";
      }
    },
    filterTypeHandler(value, row, column) {
      return row["type"] === value;
    },
    typeNameFormatter(row, column) {
      if (row.type == 1) {
        return "属性神器";
      } else if (row.type == 2) {
        return "类型神器";
      } else {
        return row.type;
      }
    },
    mainAttrFormatter(row, column) {
      let s = row.priName + " : " + row.priValue;
      if (row.priName && row.priName.indexOf("%") > 0) {
        s += "%";
      }
      return s;
    },
    mainRealStyleFormatter(row, column) {
      if (row.realStyle > 10) {
        return this.archeNamesMap[row.realStyle - 10];
      } else {
        return this.attrNamesMap[row.realStyle];
      }
    },
    naturalRankFormatter(row, column) {
      if (row.naturalRank == 1) {
        return "普通";
      } else if (row.naturalRank == 2) {
        return "魔法";
      } else if (row.naturalRank == 3) {
        return "稀有";
      } else if (row.naturalRank == 4) {
        return "英雄";
      } else if (row.naturalRank == 5) {
        return "传说";
      }
    },
    filterTypeHandler(value, row, column) {
      return row["realStyle"] === value;
    },
    filterNaturalRankHandler(value, row, column) {
      return row["naturalRank"] === value;
    },
    filterLevelHandler(value, row, column) {
      if(value===9){
        return row["level"] >= 9 && row["level"]<12
      }else{
        return row["level"] >= value;
      }

      
    },
    filterRealStyleHandler(value, row, column) {
      return row["realStyle"] === value;
    },
    filterIsBelonHandler(value, row, column) {
      return row["isBelong"] === value;
    },
    subAttr1Formatter(row, column) {
      return this.getSubStr(row.subs, 0);
    },
    subAttr2Formatter(row, column) {
      return this.getSubStr(row.subs, 1);
    },
    isBelongFormatter(row, column) {
      return row.isBelong ? "是" : "否";
    },
    subAttr3Formatter(row, column) {
      return this.getSubStr(row.subs, 2);
    },
    subAttr4Formatter(row, column) {
      return this.getSubStr(row.subs, 3);
    },
    getSubStr(subs, index) {
      if (subs.length > index) {
        let sub = subs[index];
        let s = sub.name.replace("?", sub.value);
        // let s = sub.name + ' : ' + sub.value

        return s;
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  computed: {
    displayTableData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
};
</script>
<style scoped>
.el-table .error-row {
  background: rgb(253, 226, 226);
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table .info-row {
  background: #909399;
}
.el-table tbody tr:hover>td {
  background-color:transparent !important
}
</style>
