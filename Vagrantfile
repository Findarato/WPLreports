# Vagrantfile for Fedora 22 Atomic Host

Vagrant.configure(2) do |config|

  config.vm.box = "f22atomic"

  config.vm.provider "libvirt" do |libvirt|
    libvirt.driver = "kvm"
    libvirt.memory = 512
    libvirt.cpus = 1
  end

  #config.vm.provision "shell", path: "http://192.168.1.33/~joe/provisioner.sh"
  config.vm.synced_folder "~/Documents/webapps/WPLreports/", "/vagrant/", type: "nfs", mount_options: ['rw', 'tcp','fsc']  #the fsc is for cachedfilesd

  config.vm.provision "shell", inline: <<-SHELL
    sudo chkconfig rpcbind on
    sudo chkconfig cachefilesd on
    sudo echo 'RUN=yes' > /etc/default/cachefilesd

  SHELL










end
