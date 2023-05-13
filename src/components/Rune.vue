<template>
  <div>
    <!-- <el-container style=" border: 1px solid #eee">
    <el-main> -->
    <el-row>
      <!-- <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col> -->
      <el-col :span="2">
        <el-popover
          placement="top-start"
          title="说明"
          width="200"
          trigger="hover"
        >
          <div>
            <p>这个版本主要自用，增加了很多特殊的设定。</p>
            <br />
            <p>1.只保留了总体评分</p>
            <p>
              2.命中、抵抗、爆伤属性默认为冲突属性，计算总评分数时，只会选择分数高的那一属性作为有效分数
            </p>
            <p>
              3.选择精炼后评估，计算时会比较原本精炼分数和预计精炼分数大小，取较高分数加上原总评来计算新的总评分
            </p>
            <p>预计部分属性精炼数值:速度3,攻击6,防御6,生命6</p>
            <br />
            <p>
              4.垃圾符文类型的135号位，若单个属性超过超过阈值必须总评价超过基础阈值
            </p>
            <p>5.垃圾符文类型的135号位，不符合单属性阈值，总评阈值默认+5</p>
            <p>
              垃圾符文类型：祝福、守护、集中、忍耐、猛攻、绝望、吸血、应报、保护、反击、覆灭、斗志、决心、发扬、命中、韧性
            </p>
          </div>
          <el-button slot="reference">说明</el-button>
        </el-popover>
      </el-col>
      <el-col :span="2">
        <el-popover
          placement="top-start"
          title="特殊符文说明"
          width="200"
          trigger="hover"
        >
          <div>
            <p>
              默认的权重在计算带有攻击力、暴击、爆伤属性时，分数偏低，遇到请自行考虑
            </p>
            <br />
          </div>
          <el-button slot="reference">特殊符文说明</el-button>
        </el-popover>
      </el-col>
      <el-col :span="8">
        <el-tooltip
          class="item"
          effect="dark"
          content="各类权重设置,用于计算符文评分"
          placement="top-start"
        >
          <el-button
            type="info"
            size="small"
            icon="el-icon-setting"
            @click="dialogWeightSettingVisible = true"
            >权重设置</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="各阈值设置,即大于等于该值时,认为是有价值的符文,评分阈值默认为+12符文,+9符文运算时自动减5"
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
        <el-tooltip
          class="item"
          effect="dark"
          content="表示计算时属性值是精炼前还是精炼后"
          placement="top-start"
        >
          <el-switch
            class="compute-switch"
            v-model="computeGringFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="精炼后"
            inactive-text="精炼前"
          >
          </el-switch>
        </el-tooltip>
      </el-col>
      <!-- <el-col :span="3">
                
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
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <div slot="tip" class="el-upload__tip">
            上传通过代理获得的json文件
          </div>
          <el-button size="small" @click="submit" style="margin-left: 10px"
            >开始评估</el-button
          >
        </el-upload>
      </el-col>
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
            prop="setName"
            label="类型"
            width="60"
            align="center"
            :filters="[
              { text: '祝福', value: 1 },
              { text: '守护', value: 2 },
              { text: '迅速', value: 3 },
              { text: '刀刃', value: 4 },
              { text: '激怒', value: 5 },
              { text: '集中', value: 6 },
              { text: '忍耐', value: 7 },
              { text: '猛攻', value: 8 },
              { text: '绝望', value: 10 },
              { text: '吸血', value: 11 },
              { text: '暴走', value: 13 },
              { text: '应报', value: 14 },
              { text: '意志', value: 15 },
              { text: '保护', value: 16 },
              { text: '反击', value: 17 },
              { text: '覆灭', value: 18 },
              { text: '斗志', value: 19 },
              { text: '决心', value: 20 },
              { text: '发扬', value: 21 },
              { text: '命中', value: 22 },
              { text: '韧性', value: 23 },
              { text: 'Immemorial', value: 99 },
            ]"
            :filter-method="filterSetHandler"
          >
          </el-table-column>
          <el-table-column
            prop="slot"
            label="位置"
            width="60"
            align="center"
            :filters="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
              { text: 5, value: 5 },
              { text: 6, value: 6 },
            ]"
            :filter-method="filterSlotHandler"
          >
          </el-table-column>
          <el-table-column
            prop="stars"
            label="星级"
            width="48"
            align="center"
            :formatter="starsFormatter"
          >
          </el-table-column>
          <el-table-column
            prop="gradeName"
            label="品质"
            width="78"
            :filters="[
              { text: '普通', value: 1 },
              { text: '魔法', value: 2 },
              { text: '稀有', value: 3 },
              { text: '英雄', value: 4 },
              { text: '传说', value: 5 },
              { text: '远古普通', value: 11 },
              { text: '远古魔法', value: 12 },
              { text: '远古稀有', value: 13 },
              { text: '远古英雄', value: 14 },
              { text: '远古传说', value: 15 },
            ]"
            :filter-method="filterGradeHandler"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="level"
            label="等级"
            width="60"
            :filters="[
              { text: '大于等于12', value: 12 },
              { text: '大于等于9', value: 9 },
            ]"
            :filter-method="filterLevelHandler"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mainAttr"
            label="主属性"
            width="120"
            :formatter="mainAttrFormatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="innateAttr"
            label="前缀属性"
            width="120"
            :formatter="innateAttrFormatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr1"
            label="副属性1"
            width="140"
            :formatter="subAttr1Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr2"
            label="副属性2"
            width="140"
            :formatter="subAttr2Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr3"
            label="副属性3"
            width="140"
            :formatter="subAttr3Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subAttr4"
            label="副属性4"
            width="140"
            :formatter="subAttr4Formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="scoresMap.globalWizard.score"
            label="原始评分"
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
            prop="scoresMap.globalWizard.currentGrindScore"
            label="当前精炼"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="scoresMap.globalWizard.maxGrindScore"
            label="预计精炼"
            width="60"
            align="center"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="scoresMap.attckWizard"
            label="攻击分"
            width="80"           
            align="center"         
            >
            <template slot="header" slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="常规输出魔灵属性乘权重后相加,默认速度、攻击、暴击、暴击伤害，可在权重设置中设置" placement="top">
                <span></span>
              <i class="el-icon-question" >攻击分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="scoresMap.defAttackWizard"
            label="防御分"
            width="80"           
            align="center"
            >
            <template slot="header" slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="防御输出魔灵属性乘权重后相加,默认速度、攻击、暴击、暴击伤害、防御,可在权重设置中设置" placement="top">
                <span></span>
              <i class="el-icon-question" >防御分</i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="scoresMap.supportWizard"
            label="辅助分"
            width="80"           
            align="center"
            >
            <template slot="header" slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="辅助魔灵属性乘权重后相加,默认速度、攻击、命中、抵抗、体力、防御,可在权重设置中设置" placement="top">
                <span></span>
              <i class="el-icon-question" >辅助分</i>
              </el-tooltip>
            </template>
          </el-table-column>         
          <el-table-column
            prop="scoresMap.hpWizard"
            label="体力分"
            width="80"           
            align="center"
            >
            <template slot="header" slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="体力魔灵属性乘权重后相加,默认速度、体力、抵抗,可在权重设置中设置" placement="top">
                <span></span>
              <i class="el-icon-question" >体力分</i>
              </el-tooltip>
            </template>
          </el-table-column>  -->
          <el-table-column
            prop="advise"
            label="建议"
            width="50"
            :formatter="adviseFormatter"
            align="center"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="signFlagName"
            label="处理"
            width="65"
            :formatter="signFlagFormatter"
            :filters="[{text: '未处理', value: false}, {text: '已处理', value: true}]"
            :filter-method="filterSignFlagHandler"
            align="center"
            >
          </el-table-column> -->
          <!-- <el-table-column
            prop='signAction'        
            label="操作"
            width="48">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="signRune(scope.$index, tableData)"
                type="text"
                size="small">
                处理
              </el-button>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="isBelong"
            label="佩戴"
            width="60"
            :formatter="isBelongFormatter"
            :filters="[
              { text: '是', value: 1 },
              { text: '否', value: 0 },
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
      title="权重设置"
      :visible.sync="dialogWeightSettingVisible"
      center
      width="40%"
      @open="weightDialogOpen"
      top="5vh"
    >
      <span>评分类型:</span>
      <el-select
        v-model="currentWeightType"
        placeholder=""
        @change="weightDialogOpen"
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
        <el-form-item label="速度" :label-width="formLabelWidth">
          <el-input v-model="weightForm.speed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="暴击率" :label-width="formLabelWidth">
          <el-input v-model="weightForm.crate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="暴击伤害" :label-width="formLabelWidth">
          <el-input v-model="weightForm.cdmg" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="攻击力%" :label-width="formLabelWidth">
          <el-input v-model="weightForm.atk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体力%" :label-width="formLabelWidth">
          <el-input v-model="weightForm.hp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="防御力" :label-width="formLabelWidth">
          <el-input v-model="weightForm.def" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="命中" :label-width="formLabelWidth">
          <el-input v-model="weightForm.acc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="抵抗" :label-width="formLabelWidth">
          <el-input v-model="weightForm.res" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="攻击力+" :label-width="formLabelWidth">
          <el-input v-model="weightForm.atkFlat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体力+" :label-width="formLabelWidth">
          <el-input v-model="weightForm.hpFlat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="防御力+" :label-width="formLabelWidth">
          <el-input v-model="weightForm.defFlat" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogWeightSettingVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="saveWeights">确 定</el-button>
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
        <el-divider>单项</el-divider>
        <el-form-item label="速度" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.speed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="暴击率" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.crate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="暴击伤害" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.cdmg" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="攻击力%" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.atk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体力%" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.hp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="防御力" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.def" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="命中" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.acc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="抵抗" :label-width="formLabelWidth">
          <el-input v-model="thresholdForm.res" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="攻击力+" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.atkFlat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="体力+" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.hpFlat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="防御力+" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.defFlat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-divider>评分</el-divider>
        <el-form-item label="总评分" :label-width="formLabelWidth">
          <el-input
            v-model="thresholdForm.globalWizard"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="攻击分" :label-width="formLabelWidth">
            <el-input v-model="thresholdForm.attckWizard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="防御分" :label-width="formLabelWidth">
            <el-input v-model="thresholdForm.defAttackWizard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="辅助分" :label-width="formLabelWidth">
            <el-input v-model="thresholdForm.supportWizard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="体力分" :label-width="formLabelWidth">
            <el-input v-model="thresholdForm.hpWizard" autocomplete="off"></el-input>
          </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogWeightSettingVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="saveThresholds">确 定</el-button>
      </div>
    </el-dialog>
    <!-- </el-main>
  </el-container> -->
  </div>
</template>

<script>
import { getRuneResult, getWeightsMap } from "@/utils/compute";
import {
  singleThresholds,
  scoreThresholds,
  scroeStrictRunes,
  speedStrictRunes,
} from "@/utils/weight";
export default {
  name: "HelloWorld",
  data() {
    let signedRunes =
      JSON.parse(window.localStorage.getItem("singedRunes")) || {};
    return {
      fileList: [],
      computeGringFlag: true,
      tableData: [],
      // singleThresholdMap:{},
      // scoreThresholdMap:{},
      signedRunes: signedRunes,
      weights: {},
      dialogWeightSettingVisible: false,
      dialogThresholdSettingVisible: false,
      formLabelWidth: "120px",
      WeightSettingOptions: [
        {
          value: "globalWizard",
          label: "总评分",
        },
        // , {
        //   value: 'attckWizard',
        //   label: '攻击分'
        // }, {
        //   value: 'defAttackWizard',
        //   label: '防御分'
        // }, {
        //   value: 'supportWizard',
        //   label: '辅助分'
        // }, {
        //   value: 'hpWizard',
        //   label: '体力分'
        // }
      ],
      currentWeightType: "globalWizard",
      weightForm: {
        speed: "",
        crate: "",
        cdmg: "",
        res: "",
        acc: "",
        atk: "",
        def: "",
        hp: "",
        atkFlat: "",
        defFlat: "",
        hpFlat: "",
      },
      thresholdForm: {
        speed: "",
        crate: "",
        cdmg: "",
        res: "",
        acc: "",
        atk: "",
        def: "",
        hp: "",
        atkFlat: "",
        defFlat: "",
        hpFlat: "",
        globalWizard: 50,
        attckWizard: 45,
        defAttackWizard: 45,
        supportWizard: 45,
        hpWizard: 45,
      },
      currentPage: 1,
      pagesize: 200,
      total: 0,
      // displayTableData:[]
    };
  },
  mounted() {
    // this.singleThresholdMap = singleThresholds
    // this.scoreThresholdMap = scoreThresholds
    this.weights =
      JSON.parse(window.localStorage.getItem("weights")) || getWeightsMap();
    this.thresholdForm =
      JSON.parse(window.localStorage.getItem("thresholds")) ||
      Object.assign(
        JSON.parse(JSON.stringify(singleThresholds)),
        scoreThresholds
      );

    // this.$axios.get('/localConfig.json').then(res => {
    //   let rankList = JSON.parse(res.data.rankList)

    //   console.info(`当前数组长度:${rankList.length}`)
    //   let ridArr = []
    //   let realRankList = []
    //   for(let i of rankList){
    //     console.info(i)
    //     if(i && i.rid && ridArr.indexOf(i.rid)<0){
    //       ridArr.push(i.rid)
    //       realRankList.push(i)
    //     }else if(i && i.rid){
    //       console.info(`重复id:${i.rid}`)
    //     }
    //   }
    //   console.info(`最终数组长度:${realRankList.length}`)
    //   debugger

    // })
  },
  methods: {
    weightDialogOpen() {
      let cWeights = this.weights[this.currentWeightType];
      for (let i in this.weightForm) {
        if (cWeights[i]) {
          this.weightForm[i] = cWeights[i];
        } else {
          this.weightForm[i] = "";
        }
      }
    },
    saveWeights() {
      this.weights[this.currentWeightType] = JSON.parse(
        JSON.stringify(this.weightForm)
      );
      window.localStorage.setItem("weights", JSON.stringify(this.weights));
      this.dialogWeightSettingVisible = false;
    },
    saveThresholds() {
      window.localStorage.setItem(
        "thresholds",
        JSON.stringify(this.thresholdForm)
      );
      this.dialogThresholdSettingVisible = false;
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
        this.tableData = getRuneResult(
          dataJson,
          this.computeGringFlag,
          this.weights
        );

        for (let data of this.tableData) {
          if (this.signedRunes[data.id]) {
            data.signFlag = true;
          }
          if (data.level < 9) {
            data.advise = "强化过低";
          }
        }
        this.tableData.sort((d1, d2) => {
          if (d1.setId < d2.setId) {
            return -1;
          } else if (d1.setId == d2.setId && d1.slot < d2.slot) {
            return -1;
          } else if (
            d1.setId == d2.setId &&
            d1.slot == d2.slot &&
            d1.level > d2.level
          ) {
            return -1;
          } else if (
            d1.setId == d2.setId &&
            d1.slot == d2.slot &&
            d1.level == d2.level &&
            d1.grade > d2.grade
          ) {
            return -1;
          } else if (
            d1.setId == d2.setId &&
            d1.slot == d2.slot &&
            d1.level == d2.level &&
            d1.grade == d2.grade &&
            d1.id > d2.id
          ) {
            return -1;
          }
          return 1;
        });
        console.info();
        this.total = this.tableData.length;
      };
    },
    filterLevelHandler(value, row, column) {
      if (value == 9) {
        return row["level"] >= value && row["level"] < 12;
      } else {
        return row["level"] >= value;
      }
    },
    filterGradeHandler(value, row, column) {
      return row["grade"] === value;
    },
    filterSetHandler(value, row, column) {
      return row["setId"] === value;
    },
    filterSlotHandler(value, row, column) {
      return row["slot"] === value;
    },
    filterSignFlagHandler(value, row, column) {
      return (row["signFlag"] || false) == value;
    },
    filterIsBelonHandler(value, row, column) {
      if (value == 0) {
        return row.belongMonId == value;
      } else {
        return row.belongMonId > value;
      }
    },
    starsFormatter(row, column) {
      return row.stars > 10 ? row.stars - 10 : row.stars;
    },
    mainAttrFormatter(row, column) {
      let s = row.mainName + " : " + row.mainValue;
      if (row.mainName && row.mainName.indexOf("%") > 0) {
        s += "%";
      }
      return s;
    },
    innateAttrFormatter(row, column) {
      if (row.innatName) {
        let s = row.innatName + " : " + row.innateValue;
        if (row.innatName && row.innatName.indexOf("%") > 0) {
          s += "%";
        }
        return s;
      }
    },
    subAttr1Formatter(row, column) {
      return this.getSubStr(row.subs, 0);
    },
    subAttr2Formatter(row, column) {
      return this.getSubStr(row.subs, 1);
    },
    isBelongFormatter(row, column) {
      return row.belongMonId ? "是" : "否";
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
        let s = sub.statName + " : " + sub.value;
        if (sub.grind) {
          s = s + "+" + sub.grind;
        }

        if (sub.statName && sub.statName.indexOf("%") > 0) {
          s += "%";
        }
        return s;
      }
    },
    adviseFormatter(row, column) {
      return row.advise;
    },
    signFlagFormatter(row, column) {
      if (row.signFlag) {
        return "已";
      } else {
        return "未";
      }
    },
    singleThresholdClass({ row, column, rowIndex, columnIndex }) {
      if (column.property == "gradeName") {
        if (row.grade == 5 || row.grade == 15) {
          return "color: #FFAC52;";
        } else if (row.grade == 4 || row.grade == 14) {
          return "color: #F38CFF;";
        } else if (row.grade == 3 || row.grade == 13) {
          return "color: #52FFED;";
        } else if (row.grade == 2 || row.grade == 12) {
          return "color: #04D361;";
        }
      }
      //135号位并且是垃圾符文类型 单个属性超过,必须超过阈值并且总评价超过
      else if (column.property.indexOf("subAttr") >= 0) {
        let index =
          Number(column.property.charAt(column.property.length - 1)) - 1;
        let orginRank = row.orginRank
        if (row.subs.length > index) {
          let key = row.subs[index].statkey;
          let v = row.subs[index].value;
          let g = row.subs[index].grind;
          // if(this.computeGringFlag){

          v = v + g;
          

          if(orginRank!=5 && orginRank!=15 && speedStrictRunes.includes(row.setId) && [1, 3, 5].includes(row.slot)){
            if(key == "speed" && this.thresholdForm[key] && v < this.thresholdForm[key]){
              row.advise = "清理";
              return
            }
          }

          // }
          //
          //判断是否是垃圾符文并且是135号位
          if (
            scroeStrictRunes.includes(row.setId) &&
            [1, 3, 5].includes(row.slot)
          ) {
            let score = row.scoresMap["globalWizard"]["score"];
            let grindScore = row.scoresMap["globalWizard"]["currentGrindScore"];
            let totalScore = 0 + score;
            if (
              this.computeGringFlag &&
              row.scoresMap["globalWizard"]["maxGrindScore"] > grindScore
            ) {
              totalScore += row.scoresMap["globalWizard"]["maxGrindScore"];
            } else {
              totalScore += grindScore;
            }
            if (this.thresholdForm[key] && v >= this.thresholdForm[key]) {
              if (
                key == "speed" ||
                totalScore >= this.thresholdForm["globalWizard"] ||
                score > this.thresholdForm['originWizard']
              ) {
                if (!row.advise) {
                  row.advise = "保留";
                }
                return "color: #FF4949;font-weight: 700;";
              }
            }
          } else if (this.thresholdForm[key] && v >= this.thresholdForm[key]) {
            if (!row.advise) {
              row.advise = "保留";
            }
            return "color: #FF4949;font-weight: 700;";
          }
        }
        // }else if(column.property.indexOf('scoresMap')>-1 || column.property.indexOf('score')>-1){
      } else if (column.property == "scoresMap.globalWizard.score") {
        let realName = column.property.split(".")[1];
        let currentThreshold = this.thresholdForm[realName];
        let orginThreshold = this.thresholdForm['originWizard'];
        if (row.level >= 9 && row.level < 12) {
          currentThreshold = currentThreshold - 5;
          orginThreshold = orginThreshold - 5;
        }
        
        //135垃圾符文评分阈值+5
        if (
          row.level >= 12 &&
          scroeStrictRunes.includes(row.setId) &&
          [1, 3, 5].includes(row.slot)
        ) {
          currentThreshold = currentThreshold + 5;
          orginThreshold = orginThreshold + 5;
        } else if ([2, 4, 6].includes(row.slot)) {
          currentThreshold = currentThreshold - 2;
          orginThreshold = orginThreshold - 2;
          if(row.mainName.indexOf('速度')>-1){
            //debugger
            currentThreshold -= 5
            orginThreshold -=5
          }
        }
        let score = row.scoresMap["globalWizard"]["score"];
        let grindScore = row.scoresMap["globalWizard"]["currentGrindScore"];
        let totalScore = score;
        if (
          this.computeGringFlag &&
          row.scoresMap["globalWizard"]["maxGrindScore"] > grindScore
        ) {
          totalScore += row.scoresMap["globalWizard"]["maxGrindScore"];
        } else {
          totalScore += grindScore;
        }
        if (totalScore >= currentThreshold || score > orginThreshold) {
          if (!row.advise) {
            row.advise = "保留";
          }

          return "color: #FF4949;font-weight: 700;";
        }
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
      } else if (row.advise == "强化过低") {
        return "warning-row";
      }
    },
    signRune(index, rows) {
      rows[index].signFlag = !rows[index].signFlag;
      this.$set(this.tableData, index, rows[index]);
      if (rows[index].signFlag) {
        // this.signedRunes[rows[index].id]=1
        this.$set(this.signedRunes, rows[index].id, 1);
      } else if (!rows[index].signFlag && this.signedRunes[rows[index].id]) {
        this.$set(this.signedRunes, rows[index].id, 0);
        // delete  this.signedRunes[rows[index].id]
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  watch: {
    signedRunes: {
      handler(nv, ov) {
        window.localStorage.setItem("singedRunes", JSON.stringify(nv));
      },
      deep: true,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.compute-switch {
  margin-left: 10px;
}
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
