<template>
  <div class="container">
    <div class="col-md-10">
      <div class="panel panel-success" v-for="question in question">
        <div class="panel-heading " >
          <h1 class="panel-title">{{question.title}}</h1>
        </div>
        <div class="panel-body">
          {{question.content}}
          <br>
          <small class="text-muted">by {{ question.users.name }}</small>
          <br>
          <div v-show="token">
            <button type="button" class="btn btn-info pull-right" data-toggle="modal" data-target="#addComment"><span class="glyphicon glyphicon-edit">comment here</span></button>
          </div>
        </div>
        <TheAddComment/>
      </div>
    </div>
    <div class="col-md-8">
      <TheCommentList/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TheAddComment from '@/components/TheAddComment'
import TheCommentList from '@/components/TheCommentList'

export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  components: {
    TheAddComment,
    TheCommentList
  },
  methods: {
    ...mapActions([
      'getByIdQuestion'
    ])
  },
  created () {
    this.getByIdQuestion(this.$route.params.id)
  },
  computed: {
    ...mapState([
      'question'
    ])
  }
}
</script>

<style>

</style>
