import { Migration } from '@mikro-orm/migrations';

export class Migration20241209134619 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`subscriptions\` (\`id\` int unsigned not null auto_increment primary key, \`email\` varchar(255) not null, \`created_at\` datetime null, \`updated_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`subscriptions\` add unique \`subscriptions_email_unique\`(\`email\`);`);

    this.addSql(`alter table \`sub_practice\` drop foreign key \`FK_474f1855d295972d1a4453cd1f6\`;`);

    this.addSql(`alter table \`cms_user\` modify \`id\` int unsigned not null auto_increment;`);
    this.addSql(`alter table \`cms_user\` drop index \`IDX_8f9701f0b9dff97e229877949d\`;`);
    this.addSql(`alter table \`cms_user\` add unique \`cms_user_email_unique\`(\`email\`);`);

    this.addSql(`alter table \`description\` modify \`id\` int unsigned not null auto_increment;`);

    this.addSql(`alter table \`payment\` modify \`id\` int unsigned not null auto_increment, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);

    this.addSql(`alter table \`payment_status\` modify \`id\` int unsigned not null auto_increment, modify \`payment_enabled\` tinyint(1) not null default false;`);

    this.addSql(`alter table \`practice\` drop column \`solijDuudah\`, drop column \`orhijDuudah\`, drop column \`beltgelUyeNeg\`, drop column \`beltgelUyeHoyor\`, drop column \`beltgelUyeGurav\`, drop column \`hevshuulehShatNeg\`, drop column \`hevshuulehShatHoyor\`, drop column \`usegTaviltZurag\`, drop column \`shalgahZuragNeg\`, drop column \`shalgahZuragHoyor\`, drop column \`shalgahZuragGurav\`, drop column \`shalgahZuragDorov\`;`);

    this.addSql(`alter table \`practice\` add \`solij_duudah\` varchar(255) null, add \`orhij_duudah\` varchar(255) null, add \`beltgel_uye_neg\` text null, add \`beltgel_uye_hoyor\` varchar(255) null, add \`beltgel_uye_gurav\` varchar(255) null, add \`hevshuuleh_shat_neg\` text null, add \`hevshuuleh_shat_hoyor\` text null, add \`useg_tavilt_zurag\` varchar(255) null, add \`shalgah_zurag_neg\` varchar(255) null, add \`shalgah_zurag_hoyor\` varchar(255) null, add \`shalgah_zurag_gurav\` varchar(255) null, add \`shalgah_zurag_dorov\` varchar(255) null;`);
    this.addSql(`alter table \`practice\` modify \`id\` int unsigned not null auto_increment, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);

    this.addSql(`alter table \`privacy\` modify \`id\` int unsigned not null auto_increment;`);

    this.addSql(`alter table \`sub_practice\` drop index \`FK_474f1855d295972d1a4453cd1f6\`;`);
    this.addSql(`alter table \`sub_practice\` drop column \`practiceId\`;`);

    this.addSql(`alter table \`sub_practice\` add \`practice_id\` int unsigned not null;`);
    this.addSql(`alter table \`sub_practice\` modify \`id\` int unsigned not null auto_increment, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);
    this.addSql(`alter table \`sub_practice\` add constraint \`sub_practice_practice_id_foreign\` foreign key (\`practice_id\`) references \`practice\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`sub_practice\` add index \`sub_practice_practice_id_index\`(\`practice_id\`);`);

    this.addSql(`alter table \`terms\` modify \`id\` int unsigned not null auto_increment;`);

    this.addSql(`alter table \`usage\` modify \`id\` int unsigned not null auto_increment;`);

    this.addSql(`alter table \`user\` drop column \`deviceId\`, drop column \`loginType\`, drop column \`userIsBlocked\`;`);

    this.addSql(`alter table \`user\` add \`device_id\` varchar(255) not null, add \`login_type\` varchar(255) not null, add \`user_is_blocked\` tinyint(1) not null default false;`);
    this.addSql(`alter table \`user\` modify \`id\` int unsigned not null auto_increment;`);
    this.addSql(`alter table \`user\` change \`purchaseEndDate\` \`purchase_end_date\` datetime null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`subscriptions\`;`);

    this.addSql(`alter table \`sub_practice\` drop foreign key \`sub_practice_practice_id_foreign\`;`);

    this.addSql(`alter table \`cms_user\` modify \`id\` int not null auto_increment;`);
    this.addSql(`alter table \`cms_user\` drop index \`cms_user_email_unique\`;`);
    this.addSql(`alter table \`cms_user\` add unique \`IDX_8f9701f0b9dff97e229877949d\`(\`email\`);`);

    this.addSql(`alter table \`description\` modify \`id\` int not null auto_increment;`);

    this.addSql(`alter table \`payment\` modify \`id\` int not null auto_increment, modify \`created_at\` datetime(6) not null default current_timestamp(6), modify \`updated_at\` datetime(6) not null default current_timestamp(6) on update CURRENT_TIMESTAMP(6);`);

    this.addSql(`alter table \`payment_status\` modify \`id\` int not null auto_increment, modify \`payment_enabled\` tinyint not null default 0;`);

    this.addSql(`alter table \`practice\` drop column \`solij_duudah\`, drop column \`orhij_duudah\`, drop column \`beltgel_uye_neg\`, drop column \`beltgel_uye_hoyor\`, drop column \`beltgel_uye_gurav\`, drop column \`hevshuuleh_shat_neg\`, drop column \`hevshuuleh_shat_hoyor\`, drop column \`useg_tavilt_zurag\`, drop column \`shalgah_zurag_neg\`, drop column \`shalgah_zurag_hoyor\`, drop column \`shalgah_zurag_gurav\`, drop column \`shalgah_zurag_dorov\`;`);

    this.addSql(`alter table \`practice\` add \`solijDuudah\` varchar(255) null, add \`orhijDuudah\` varchar(255) null, add \`beltgelUyeNeg\` text null, add \`beltgelUyeHoyor\` varchar(255) null, add \`beltgelUyeGurav\` varchar(255) null, add \`hevshuulehShatNeg\` text null, add \`hevshuulehShatHoyor\` text null, add \`usegTaviltZurag\` varchar(255) null, add \`shalgahZuragNeg\` varchar(255) null, add \`shalgahZuragHoyor\` varchar(255) null, add \`shalgahZuragGurav\` varchar(255) null, add \`shalgahZuragDorov\` varchar(255) null;`);
    this.addSql(`alter table \`practice\` modify \`id\` int not null auto_increment, modify \`created_at\` datetime(6) not null default current_timestamp(6), modify \`updated_at\` datetime(6) not null default current_timestamp(6) on update CURRENT_TIMESTAMP(6);`);

    this.addSql(`alter table \`privacy\` modify \`id\` int not null auto_increment;`);

    this.addSql(`alter table \`sub_practice\` drop index \`sub_practice_practice_id_index\`;`);
    this.addSql(`alter table \`sub_practice\` drop column \`practice_id\`;`);

    this.addSql(`alter table \`sub_practice\` add \`practiceId\` int null;`);
    this.addSql(`alter table \`sub_practice\` modify \`id\` int not null auto_increment, modify \`created_at\` datetime(6) not null default current_timestamp(6), modify \`updated_at\` datetime(6) not null default current_timestamp(6) on update CURRENT_TIMESTAMP(6);`);
    this.addSql(`alter table \`sub_practice\` add constraint \`FK_474f1855d295972d1a4453cd1f6\` foreign key (\`practiceId\`) references \`practice\` (\`id\`) on update no action on delete no action;`);
    this.addSql(`alter table \`sub_practice\` add index \`FK_474f1855d295972d1a4453cd1f6\`(\`practiceId\`);`);

    this.addSql(`alter table \`terms\` modify \`id\` int not null auto_increment;`);

    this.addSql(`alter table \`usage\` modify \`id\` int not null auto_increment;`);

    this.addSql(`alter table \`user\` drop column \`device_id\`, drop column \`login_type\`, drop column \`user_is_blocked\`;`);

    this.addSql(`alter table \`user\` add \`deviceId\` varchar(255) not null, add \`loginType\` varchar(255) not null, add \`userIsBlocked\` tinyint not null default 0;`);
    this.addSql(`alter table \`user\` modify \`id\` int not null auto_increment;`);
    this.addSql(`alter table \`user\` change \`purchase_end_date\` \`purchaseEndDate\` datetime null;`);
  }

}
