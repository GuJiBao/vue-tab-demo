<template>
	<div class="main-wrap">
		<h2>{{tabParams.title}}</h2>
		<div class="content">{{tabParams.intro}}</div>
	</div>
</template>

<script>
import { mapGetters} from 'vuex';
import { getCurTabParams } from '@/utils';

export default {
	computed: {
		...mapGetters({
			navTabs: 'navTab/getNavTabs'
		}),
		tabParams() {
			return getCurTabParams(this.navTabs) ? getCurTabParams(this.navTabs) : {};
		}
	},
	created() {
		console.log('执行了~~');
	}
};
</script>