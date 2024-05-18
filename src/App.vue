<script setup lang="ts" >
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { partyListFindService } from './api/party';

const partyList = ref([])

const getPartyList = async () => {
  const res = await partyListFindService()
  partyList.value = res.data.data
} 

getPartyList()
</script>
  <template>
    <main>
      <el-table
        :data="partyList"
        style="width: 100%">
        <el-table-column
          prop="partyId"
          label="人员ID"
          width="300">
        </el-table-column>
        <el-table-column
          prop="partyName"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="externalId"
          label="内部ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="150">
        </el-table-column>
      </el-table>
    </main>
  </template>

<style>
</style>

