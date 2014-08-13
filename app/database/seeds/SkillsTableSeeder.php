<?php

class SkillsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('skills')->truncate();
        Skill::create([
        	'name' => 'C++',
        	'slug' => 'c++',
        	'sum' => 100
        ]);
        Skill::create([
        	'name' => 'Java',
        	'slug' => 'java',
        	'sum' => 120
        ]);
        Skill::create([
        	'name' => 'Javascript',
        	'slug' => 'javascript',
        	'sum' => 100
        ]);
	}

}
